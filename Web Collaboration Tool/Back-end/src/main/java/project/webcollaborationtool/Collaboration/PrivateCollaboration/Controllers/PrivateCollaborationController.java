package project.webcollaborationtool.Collaboration.PrivateCollaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Services.PrivateCollaborationService;

import java.util.Collection;

@RestController
@RequestMapping("/api/privateCollaboration")
@CrossOrigin(origins = "http://localhost:4200")
public class PrivateCollaborationController
{
    @Autowired
    private PrivateCollaborationService privateCollaborationService;

    @GetMapping("/{firstUsername}/{secondUsername}/isCollaborating")
    @CrossOrigin(origins = "/user", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> isCollaborating(@PathVariable String firstUsername, @PathVariable String secondUsername)
    {
        return ResponseEntity.ok().body(this.privateCollaborationService.isCollaborating(firstUsername, secondUsername));
    }

    @GetMapping("/{username}/privateCollaborations")
    @CrossOrigin(origins = "/collaborations", methods = RequestMethod.GET)
    public ResponseEntity<Collection<PrivateCollaboration>> getAllCollaborationsForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.privateCollaborationService.getAllPrivateCollaborationsForUser(username));
    }
}
