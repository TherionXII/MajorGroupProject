package project.webcollaborationtool.Collaboration.Request.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.Request.Services.PrivateCollaborationRequestService;
import project.webcollaborationtool.Notifications.Services.NotificationService;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;

import java.util.Collection;

@RestController
@RequestMapping("/api/privateRequests")
@CrossOrigin(origins = "http://localhost:4200")
public class PrivateCollaborationRequestController
{
    @Autowired
    private PrivateCollaborationRequestService privateCollaborationRequestService;

    @GetMapping("/{username}/getPrivateCollaborationRequests")
    @CrossOrigin(origins = "/collaborations", methods = RequestMethod.GET)
    public ResponseEntity<Collection<PrivateCollaborationRequest>> getCollaborationRequestsForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.privateCollaborationRequestService.getRequestsForUser(username));
    }

    @GetMapping("/{sender}/{recipient}/hasSentRequest")
    @CrossOrigin(origins = "/user/*", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasSentRequest(@PathVariable String sender, @PathVariable String recipient)
    {
        return ResponseEntity.ok().body(this.privateCollaborationRequestService.existsBySenderAndRecipient(sender, recipient));
    }

    @GetMapping("/{recipient}/{sender}/hasReceivedRequest")
    @CrossOrigin(origins = "/user/*", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasReceivedRequest(@PathVariable String recipient, @PathVariable String sender)
    {
        return ResponseEntity.ok().body(this.privateCollaborationRequestService.existsBySenderAndRecipient(sender, recipient));
    }
}
