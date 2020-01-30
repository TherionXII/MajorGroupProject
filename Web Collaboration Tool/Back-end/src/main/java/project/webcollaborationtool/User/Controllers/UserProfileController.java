package project.webcollaborationtool.User.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;
import project.webcollaborationtool.User.Services.ProfileService;

@RestController
public class UserProfileController
{
    @Autowired
    ProfileService profileService;

    @PostMapping(path = "/{username}/createUserProfile")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> createProfile(@PathVariable String username, @RequestBody Profile profile)
    {
        try
        {
            this.profileService.createProfile(username, profile);

            return ResponseEntity.ok().build();
        }
        catch(InvalidUserDataException invalidUserDataException)
        {
            return ResponseEntity.badRequest().body(invalidUserDataException.getMessage());
        }
    }

    @PostMapping(path = "/{username}/updateProfile")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> updateProfile(@PathVariable String username, @RequestBody Profile profile)
    {
        try
        {
            this.profileService.updateProfile(username, profile);

            return ResponseEntity.ok().build();
        }
        catch(InvalidUserDataException invalidUserDataException)
        {
            return ResponseEntity.badRequest().body(invalidUserDataException.getMessage());
        }
    }

    @GetMapping(path = "/{username}/getUserProfile")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<?> getProfile(@PathVariable String username)
    {
        try
        {
            return ResponseEntity.ok().body(this.profileService.getProfile(username));
        }
        catch(InvalidUserDataException invalidUserDataException)
        {
            return ResponseEntity.badRequest().body(invalidUserDataException.getMessage());
        }
    }
}
