package ariadna.ecommerce.auth.controller;

import ariadna.ecommerce.user.User;

public record RegisterRequest (
        String email,
        String password,
        String name,
        User.Role role
) {
}
