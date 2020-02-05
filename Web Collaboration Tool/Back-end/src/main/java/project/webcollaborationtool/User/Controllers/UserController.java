package project.webcollaborationtool.User.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;
import project.webcollaborationtool.User.Exceptions.UserExistsException;
import project.webcollaborationtool.User.Services.UserService;

@RestController
public class UserController
{
    @Autowired
    private UserService userService;

    @PostMapping(path = "/createUser")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<?> createUser(@RequestBody User user)
    {
        try
        {
            return ResponseEntity.ok(this.userService.createUser(user));
        }
        catch(UserExistsException | InvalidUserDataException exception)
        {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping(path = "/{username}/updatePassword")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> updatePassword(@PathVariable String username, @RequestBody String password)
    {
        try
        {
            this.userService.updatePassword(username, password);

            return ResponseEntity.ok().build();
        }
        catch(InvalidUserDataException invalidUserDataException)
        {
            return ResponseEntity.badRequest().body(invalidUserDataException.getMessage());
        }
    }

    @PostMapping(path = "/{username}/updateEmail")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> updateEmail(@PathVariable String username, @RequestBody String email)
    {
        try
        {
            this.userService.updateEmail(username, email);

            return ResponseEntity.ok().build();
        }
        catch(InvalidUserDataException invalidUserDataException)
        {
            return ResponseEntity.badRequest().body(invalidUserDataException.getMessage());
        }
    }
}
