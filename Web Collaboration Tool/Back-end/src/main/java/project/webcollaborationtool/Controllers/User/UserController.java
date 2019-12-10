package project.webcollaborationtool.Controllers.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Entities.User.Profile;
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

    @PostMapping(path = "/{username}/changePassword")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> changePassword(@PathVariable String username, @RequestBody String password)
    {
        this.userService.changePassword(username, password);
        return ResponseEntity.ok().build();
    }


}
