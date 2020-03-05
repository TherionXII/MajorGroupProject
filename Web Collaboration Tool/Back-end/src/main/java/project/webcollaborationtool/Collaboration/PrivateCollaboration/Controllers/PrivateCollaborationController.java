package project.webcollaborationtool.Collaboration.PrivateCollaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Services.PrivateCollaborationService;

import java.util.Collection;

@Controller
public class PrivateCollaborationController
{
    @Autowired
    private PrivateCollaborationService privateCollaborationService;

    @GetMapping("/isCollaborating/{firstUsername}/{secondUsername}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> isCollaborating(@PathVariable String firstUsername, @PathVariable String secondUsername)
    {
        return ResponseEntity.ok().body(this.privateCollaborationService.isCollaborating(firstUsername, secondUsername));
    }

    @GetMapping("/privateCollaborations/{username}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Collection<PrivateCollaboration>> getAllCollaborationsForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.privateCollaborationService.getAllPrivateCollaborationsForUser(username));
    }
}
