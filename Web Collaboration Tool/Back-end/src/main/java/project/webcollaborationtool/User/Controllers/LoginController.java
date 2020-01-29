package project.webcollaborationtool.User.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidCredentialsException;
import project.webcollaborationtool.User.Services.LoginService;

@RestController
public class LoginController
{
    @Autowired
    private LoginService loginService;

    @PostMapping(path = "/login")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User user)
    {
        try
        {
            this.loginService.Login(user);

            return ResponseEntity.ok().build();
        }
        catch(InvalidCredentialsException invalidCredentialsException)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(invalidCredentialsException.getMessage());
        }
    }
}
