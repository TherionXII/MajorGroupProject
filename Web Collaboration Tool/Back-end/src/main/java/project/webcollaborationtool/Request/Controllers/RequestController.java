package project.webcollaborationtool.Request.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Services.PrivateCollaborationService;
import project.webcollaborationtool.Notifications.Services.NotificationService;
import project.webcollaborationtool.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Request.Services.RequestService;

@Controller
public class RequestController
{
    @Autowired
    private PrivateCollaborationService privateCollaborationService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/hasSentRequest/{sender}/{recipient}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasSentRequest(@PathVariable String sender, @PathVariable String recipient)
    {
        return ResponseEntity.ok().body(this.requestService.existsBySenderAndRecipient(sender, recipient));
    }

    @GetMapping("/hasReceivedRequest/{recipient}/{sender}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasReceivedRequest(@PathVariable String recipient, @PathVariable String sender)
    {
        return ResponseEntity.ok().body(this.requestService.existsBySenderAndRecipient(sender, recipient));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @MessageMapping("/user/collaboration/request")
    public void createCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest) throws Exception
    {
        this.requestService.createPrivateCollaborationRequest(privateCollaborationRequest);
        this.notificationService.addPrivateCollaborationRequestNotification(privateCollaborationRequest);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @MessageMapping("/user/collaboration/response")
    public void respondToCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest) throws Exception
    {
        if(privateCollaborationRequest.getIsAccepted()) this.privateCollaborationService.createPrivateCollaboration(privateCollaborationRequest);

        this.notificationService.addPrivateCollaborationRequestResponseNotification(privateCollaborationRequest);

        this.requestService.respondToCollaborationRequest(privateCollaborationRequest);
    }
}
