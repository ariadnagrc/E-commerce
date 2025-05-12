package ariadna.ecommerce.config;

import ariadna.ecommerce.auth.repository.TokenRepository;
import ariadna.ecommerce.auth.service.JwtService;
import ariadna.ecommerce.user.User;
import ariadna.ecommerce.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String path = request.getServletPath();
        if (path.startsWith("/api/v1/auth") || path.startsWith("/swagger") || path.contains("v3/api-docs")) {
            filterChain.doFilter(request, response);
            logger.error("bye");
            return;
        }

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        logger.error("Authorization Header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        if (jwt == null || jwt.trim().isEmpty() || jwt.split("\\.").length != 3) {
            logger.error("Token inválido o mal formado");
            filterChain.doFilter(request, response);
            return;
        }

        final String userEmail;
        try {
            userEmail = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            filterChain.doFilter(request, response); // token inválido
            logger.error("Token inválido o mal formado 2");
            return;
        }

        logger.error("Va bien (1)");

        if (userEmail == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (userEmail == null || authentication != null) {
            filterChain.doFilter(request, response);
            logger.error("Fallo de email o autenticación");
            return;
        }

        UserDetails userDetails = null;
        try {
            userDetails = this.userDetailsService.loadUserByUsername(userEmail);
        } catch (UsernameNotFoundException e) {
            logger.error("Usuario no encontrado: {}");
            filterChain.doFilter(request, response);
            return;
        }

        logger.error("Va bien (2)");

        final boolean isTokenExpiredOrRevoked = tokenRepository.findByToken(jwt)
                .map(token -> {
                    boolean valid = !token.getExpired() && !token.getRevoked();
                    logger.info("Token válido: {}");
                    return valid;
                })
                .orElse(false);

        if (isTokenExpiredOrRevoked) {
            final Optional<User> user = userRepository.findByEmail(userEmail);
            if (user.isPresent()) {
                logger.info("Usuario encontrado: {} "+ user.get().getEmail());
            } else {
                logger.error("Usuario no encontrado en la BBDD: {} "+ userEmail);
            }

            if (user.isPresent()) {
                final boolean isTokenValid = jwtService.isTokenValid(jwt, user.get());

                if (isTokenValid) {
                    logger.info("El token es válido");
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}