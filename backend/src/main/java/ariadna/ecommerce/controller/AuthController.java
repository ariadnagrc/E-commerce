package ariadna.ecommerce.controller;

import ariadna.ecommerce.dto.RegisterRequest;
import ariadna.ecommerce.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Marca la clase como un controlador REST que devuelve datos (JSON) en las respuestas.
// Combina @Controller y @ResponseBody para simplificar APIs RESTful.
@RestController

// Define una ruta base para el controlador, en este caso todas comenzarán con "/auth".
// Facilita la organización de rutas relacionadas, como login o registro.
@RequestMapping("/auth")
public class AuthController {

    // Inyecta automáticamente una dependencia gestionada por Spring.
    // Evita tener que crear instancias manualmente, siguiendo la inversión de control.
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return ResponseEntity.ok(message);
    }
}
