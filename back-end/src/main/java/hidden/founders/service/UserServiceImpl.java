package hidden.founders.service;

import hidden.founders.model.User;
import hidden.founders.repository.UserRepository;
import org.apache.commons.collections4.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Iterator;
import java.util.List;
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void populateSampleData() {
        userRepository.save(new User("email@test", "pass"));
    }


    @Override
    public List<User> getUsers() {
        Iterator<User> userIterator = userRepository.findAll().iterator();
        return IteratorUtils.toList(userIterator);
    }

    @Override
    public User getUser(Long id) {
        return userRepository.findOne(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findOneByEmail(email);
    }

    @Override
    public User findUserByEmailAndPassword(String email, String password) {
        return userRepository.findOneByEmailAndPassword(email, password);
    }
}
