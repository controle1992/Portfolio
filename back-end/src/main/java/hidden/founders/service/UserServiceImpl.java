package hidden.founders.service;

import hidden.founders.model.FacebookToken;
import hidden.founders.model.User;
import hidden.founders.repository.UserRepository;
import org.apache.commons.collections4.IteratorUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.Iterator;
import java.util.List;
@Service
public class UserServiceImpl implements UserService{

    private final String appId="199416317297030";
    private final String appSecret="37977dce691cf12d227ce05cfb755344";

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RestTemplate restTemplate;


    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

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
    public User getLongAccessToken(User user) {
        user.setId(findUserByEmail(user.getEmail()).getId());
        FacebookToken facebookToken = restTemplate.getForObject("https://graph.facebook.com/oauth/access_token?" +
               "grant_type=fb_exchange_token&" +
               "client_id={appId}&" +
               "client_secret={appSecret}&" +
               "fb_exchange_token={accessToken}", FacebookToken.class, appId, appSecret,user.getAccessToken());
        user.setAccessToken(facebookToken.getAccess_token());
        return createUser(user);
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
