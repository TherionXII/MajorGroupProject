package project.webcollaborationtool.Collaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import project.webcollaborationtool.Collaboration.Services.NotificationService;

@Controller
public class NotificationController
{
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/hasSentRequest/{sender}/{recipient}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasSentRequest(@PathVariable String sender, @PathVariable String recipient)
    {
        return ResponseEntity.ok().body(this.notificationService.hasSentCollaborationRequest(sender, recipient));
    }

    @GetMapping("/hasReceivedRequest/{recipient}/{sender}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> hasReceivedRequest(@PathVariable String recipient, @PathVariable String sender)
    {
        return ResponseEntity.ok().body(this.notificationService.hasReceivedCollaborationRequest(recipient, sender));
    }
}
