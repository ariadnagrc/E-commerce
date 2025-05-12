package ariadna.ecommerce.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    List<Token> findAllByUser_IdAndExpiredFalseAndRevokedFalse(Integer userId);


    Optional<Token> findByToken(String token);
}