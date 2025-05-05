package ariadna.ecommerce.service;

import ariadna.ecommerce.dto.RegisterRequest;
import ariadna.ecommerce.model.User;
import ariadna.ecommerce.model.User.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService; // Usamos el servicio

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        if (userService.existsByEmail(request.getEmail())) {
            return "El correo ya está en uso";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userService.save(user);

        return "Usuario registrado con éxito";
    }
}
