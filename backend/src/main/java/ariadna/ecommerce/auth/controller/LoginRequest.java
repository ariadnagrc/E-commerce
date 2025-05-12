package ariadna.ecommerce.auth.controller;

public record LoginRequest (
        String email,
        String password
) {
}
