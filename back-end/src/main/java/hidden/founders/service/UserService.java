package hidden.founders.service;

import hidden.founders.model.User;

import java.util.List;
public interface UserService {
    List<User> getUsers();
    User getUser(Long id);
    User createUser(User user);
    User getLongAccessToken(User user);
    User findUserByEmail(String email);
    User findUserByEmailAndPassword(String email, String password);
}
