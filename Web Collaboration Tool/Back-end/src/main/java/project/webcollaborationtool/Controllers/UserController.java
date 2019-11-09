package project.webcollaborationtool.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Entities.User;
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
        this.userService.createUser(user);
        return ResponseEntity.ok().build();
    }
}
