package hidden.founders.repository;

import hidden.founders.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findOneByEmail(String email);
    User findOneByEmailAndPassword(String email, String password);
}
