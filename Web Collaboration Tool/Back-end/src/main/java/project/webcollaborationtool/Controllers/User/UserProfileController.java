package project.webcollaborationtool.Controllers.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Entities.User.Profile;
import project.webcollaborationtool.Services.User.UserProfileService;

@RestController
public class UserProfileController
{
    @Autowired
    UserProfileService userProfileService;

    @PostMapping(path = "/{username}/createUserProfile")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> createUserProfile(@PathVariable String username, @RequestBody Profile profile)
    {
        this.userProfileService.createUserProfile(username, profile);

        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/{username}/updateProfile")
    @CrossOrigin(methods = { RequestMethod.POST }, origins = "http://localhost:4200")
    public ResponseEntity<String> updateUserProfile(@PathVariable String username, @RequestBody Profile profile)
    {
        this.userProfileService.updateUserProfile(username, profile);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/{username}/getUserProfile")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Profile> getUserProfile(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.userProfileService.getUserProfile(username));
    }
}
