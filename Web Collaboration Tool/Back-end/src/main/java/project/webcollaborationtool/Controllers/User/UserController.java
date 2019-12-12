package project.webcollaborationtool.Controllers.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Entities.User.User;
import project.webcollaborationtool.Exceptions.UserExistsException;
import project.webcollaborationtool.Services.User.UserService;

@RestController
public class UserController
{
    @Autowired
    private UserService userService;

    @PostMapping(path = "/createUser")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> createUser(@RequestBody User user)
    {
        try
        {
            this.userService.createUser(user);

            return ResponseEntity.ok().build();
        }
        catch(UserExistsException userExistsException)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(userExistsException.getMessage());
        }
    }

    @PostMapping(path = "/{username}/updatePassword")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> updatePassword(@PathVariable String username, @RequestBody String password)
    {
        this.userService.updatePassword(username, password);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/{username}/updateEmail")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> updateEmail(@PathVariable String username, @RequestBody String email)
    {
        this.userService.updateEmail(username, email);
        return ResponseEntity.ok().build();
    }
}
