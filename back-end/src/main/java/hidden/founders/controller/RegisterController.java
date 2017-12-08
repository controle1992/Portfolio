package hidden.founders.controller;

import hidden.founders.model.User;
import hidden.founders.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("back")
public class RegisterController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody User user) {
        /*
            user: The user sent by the front end for storing
            returns http response with an empty user object if it's find in the database,
            else return http response with the created user
        */
        if (userService.findUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(new User(), HttpStatus.OK);
        }

        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }
}
