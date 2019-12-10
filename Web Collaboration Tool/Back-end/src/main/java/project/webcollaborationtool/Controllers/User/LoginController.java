package project.webcollaborationtool.Controllers.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Entities.User.User;
import project.webcollaborationtool.Exceptions.InvalidCredentialsException;
import project.webcollaborationtool.Services.User.LoginService;

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
