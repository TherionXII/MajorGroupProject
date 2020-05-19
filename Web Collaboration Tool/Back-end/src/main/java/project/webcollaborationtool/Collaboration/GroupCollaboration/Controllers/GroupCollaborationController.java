package project.webcollaborationtool.Collaboration.GroupCollaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Exceptions.InvalidGroupDataException;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Services.GroupCollaborationService;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupCollaborationController
{
    @Autowired
    private GroupCollaborationService groupCollaborationService;

    @PostMapping("/{username}/createGroup")
    @CrossOrigin(origins = "/groups", methods = RequestMethod.POST)
    public ResponseEntity<?> createGroup(@RequestBody GroupCollaboration groupCollaboration, @PathVariable String username)
    {
        try
        {
            return ResponseEntity.ok().body(this.groupCollaborationService.createGroup(groupCollaboration, username));
        }
        catch(InvalidUserDataException invalidUserDataException)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(invalidUserDataException.getMessage());
        }
    }

    @GetMapping("/{username}/getGroups")
    @CrossOrigin(origins = "/groups", methods = RequestMethod.GET)
    public ResponseEntity<?> getGroupsForUser(@PathVariable String username)
    {
        try
        {
            return ResponseEntity.ok().body(this.groupCollaborationService.getGroupsForUser(username));
        }
        catch(InvalidUserDataException invalidUserDataException)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(invalidUserDataException.getMessage());
        }
    }

    @GetMapping("/{groupId}/getGroup")
    @CrossOrigin(origins = "/group/{groupId}", methods = RequestMethod.GET)
    public ResponseEntity<?> getGroupById(@PathVariable Integer groupId)
    {
        try
        {
            return ResponseEntity.ok().body(this.groupCollaborationService.getGroupById(groupId));
        }
        catch(InvalidGroupDataException invalidGroupDataException)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(invalidGroupDataException.getMessage());
        }
    }
}
