package project.webcollaborationtool.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Entities.User;
import project.webcollaborationtool.Entities.UserInformation;
import project.webcollaborationtool.Exceptions.UserExistsException;
import project.webcollaborationtool.Services.UserService;

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

    @PostMapping(path = "/{username}/createUserInformation")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> createUserInformation(@PathVariable String username, @RequestBody UserInformation userInformation)
    {
        this.userService.createUserInformation(username, userInformation);

        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/{username}/changePassword")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> changePassword(@PathVariable String username, @RequestBody String password)
    {
        this.userService.changePassword(username, password);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/{username}/changeUserInformation")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> changeUserInformation(@PathVariable String username,
                                                        @RequestBody UserInformation userInformation)
    {
        this.userService.changeUserInformation(username, userInformation);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/getUserInformation/{username}")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<UserInformation> getUserInformation(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.userService.getUserInformation(username));
    }
}
