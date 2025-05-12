//package ariadna.ecommerce.config;
//
//import ariadna.ecommerce.model.User;
//import ariadna.ecommerce.user.UserRepository;
//import ariadna.ecommerce.model.User.Role;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//public class DataInitializer {
//
//    @Bean
//    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        return args -> {
//            if (userRepository.findByEmail("admin@yourshop.com").isEmpty()) {
//                User admin = new User();
//                admin.setEmail("admin@yourshop.com");
//                admin.setPassword(passwordEncoder.encode("admin123"));
//                admin.setRole(Role.ADMIN);
//                userRepository.save(admin);
//                System.out.println("Admin user created.");
//            }
//
//            if (userRepository.findByEmail("user@yourshop.com").isEmpty()) {
//                User user = new User();
//                user.setEmail("user@yourshop.com");
//                user.setPassword(passwordEncoder.encode("user123"));
//                user.setRole(Role.USER);
//                userRepository.save(user);
//                System.out.println("Regular user created.");
//            }
//        };
//    }
//}
//
