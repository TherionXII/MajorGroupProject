package project.webcollaborationtool.Collaboration.Request.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Services.PrivateCollaborationService;
import project.webcollaborationtool.Collaboration.Request.Services.PrivateCollaborationRequestService;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Services.NotificationService;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;

import java.util.Collection;

@Controller
public class PrivateCollaborationRequestController
{
    @Autowired
    private PrivateCollaborationService privateCollaborationService;

    @Autowired
    private PrivateCollaborationRequestService privateCollaborationRequestService;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/getPrivateCollaborationRequests/{username}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Collection<PrivateCollaborationRequest>> getCollaborationRequestsForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.privateCollaborationRequestService.getRequestsForUser(username));
    }

    @GetMapping("/hasSentRequest/{sender}/{recipient}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasSentRequest(@PathVariable String sender, @PathVariable String recipient)
    {
        return ResponseEntity.ok().body(this.privateCollaborationRequestService.existsBySenderAndRecipient(sender, recipient));
    }

    @GetMapping("/hasReceivedRequest/{recipient}/{sender}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasReceivedRequest(@PathVariable String recipient, @PathVariable String sender)
    {
        return ResponseEntity.ok().body(this.privateCollaborationRequestService.existsBySenderAndRecipient(sender, recipient));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @SendTo("/topic/user/collaboration/request/{recipient}")
    @MessageMapping("/user/collaboration/request/{recipient}")
    public Notification createCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest)
    {
        this.privateCollaborationRequestService.createPrivateCollaborationRequest(privateCollaborationRequest);
        return this.notificationService.addPrivateCollaborationRequestNotification(privateCollaborationRequest);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @SendTo("/topic/user/collaboration/request/{recipient}")
    @MessageMapping("/user/collaboration/response/{recipient}")
    public Notification respondToCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest)
    {
        if(privateCollaborationRequest.getIsAccepted()) this.privateCollaborationService.createPrivateCollaboration(privateCollaborationRequest);

        this.privateCollaborationRequestService.deleteCollaborationRequest(privateCollaborationRequest);

        return this.notificationService.addPrivateCollaborationRequestResponseNotification(privateCollaborationRequest);
    }
}
