package ariadna.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // <-- looks for templates/login.html
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "admin";
    }

    @GetMapping("/user/dashboard")
    public String userDashboard() {
        return "user";
    }
}
