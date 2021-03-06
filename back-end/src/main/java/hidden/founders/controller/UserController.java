package hidden.founders.controller;

import hidden.founders.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("back")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        /*
            Returns all the users in the database
        */
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public ResponseEntity<?> getUser(@RequestBody String email) {
        /*
            email: the email of the user to look for
            This function returns the user
        */
        return new ResponseEntity<>(userService.findUserByEmail(email), HttpStatus.OK);
    }
}
