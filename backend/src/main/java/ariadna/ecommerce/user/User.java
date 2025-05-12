package ariadna.ecommerce.user;


import ariadna.ecommerce.auth.repository.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)  // Esto hará que el valor del enum se guarde como su nombre (es decir, 'ADMIN', 'USER')
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    public enum Role {
        ADMIN,
        USER
    }
}