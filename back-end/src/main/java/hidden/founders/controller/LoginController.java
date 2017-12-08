package hidden.founders.controller;

import hidden.founders.model.User;
import hidden.founders.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("back")
public class LoginController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody User user) {
        /*
            user: user sent by the front end to verify login
            returns http response with the user object if it's find in the database,
            else return an empty user object
        */
        if (StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getPassword())) {
            return new ResponseEntity<>(new User(), HttpStatus.OK);
        }
        if (userService.findUserByEmailAndPassword(user.getEmail(), user.getPassword()) == null){
            return new ResponseEntity<>(new User(), HttpStatus.OK);
        }
        return new ResponseEntity<>(userService.findUserByEmail(user.getEmail()), HttpStatus.OK);
    }

    @RequestMapping(value = "/accessToken", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getToken(@RequestBody User user) {
        /*
            user: user requesting a long term access token
            returns http response with the user object with a long term access token
        */
        return new ResponseEntity<>(userService.getLongAccessToken(user), HttpStatus.OK);
    }
}
