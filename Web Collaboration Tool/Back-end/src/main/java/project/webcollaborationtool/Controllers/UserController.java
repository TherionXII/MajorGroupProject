package project.webcollaborationtool.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController
{
    @PostMapping(path = "/createUser")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public String createUser(@RequestBody String message)
    {
        System.out.println(message);
        return "Status";
    }
}
