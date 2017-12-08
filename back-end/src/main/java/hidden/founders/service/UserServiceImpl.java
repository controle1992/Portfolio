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

import java.util.Iterator;
import java.util.List;
@Service
public class UserServiceImpl implements UserService{

    // facebook appId
    private final String appId="162201394391436";
    //facebook appSecret
    private final String appSecret="e3b265e3330f90c29fe18f1920c2aba4";

    @Autowired
    private UserRepository userRepository;
    @Autowired
    //restTemplate is used to call the facebook graphAPI to get long term access token
    private RestTemplate restTemplate;


    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Override
    public List<User> getUsers() {
        Iterator<User> userIterator = userRepository.findAll().iterator();
        return IteratorUtils.toList(userIterator);
    }

    @Override
    public User getUser(Long id) {
        /*
            id: the id of the user to look for
            returns the user
        */
        return userRepository.findOne(id);
    }

    @Override
    public User createUser(User user) {
         /*
            user: the user to store in the database
            returns the stored user
        */
        return userRepository.save(user);
    }

    @Override
    public User getLongAccessToken(User user) {
         /*
            user: the user that want long term access token
            returns the stored user with long term access token
        */
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
         /*
            email: the email of the user to look for
            returns the user
        */
        return userRepository.findOneByEmail(email);
    }

    @Override
    public User findUserByEmailAndPassword(String email, String password) {
        /*
            email: the email of the user to look for
            password: the password of the user to look for
            returns the user
        */
        return userRepository.findOneByEmailAndPassword(email, password);
    }
}
