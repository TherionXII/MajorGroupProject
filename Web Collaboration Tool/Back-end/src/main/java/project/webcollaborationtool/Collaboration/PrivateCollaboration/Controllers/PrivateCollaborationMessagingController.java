package project.webcollaborationtool.Collaboration.PrivateCollaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Services.PrivateCollaborationService;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Services.PrivateCollaborationRequestService;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Services.NotificationService;

@RestController
public class PrivateCollaborationMessagingController
{
    @Autowired
    private PrivateCollaborationRequestService privateCollaborationRequestService;

    @Autowired
    private PrivateCollaborationService privateCollaborationService;

    @Autowired
    private NotificationService notificationService;

    @SendTo("/topic/user/notification/{recipient}")
    @MessageMapping("/user/collaboration/response/{recipient}")
    public Notification respondToCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest)
    {
        if(privateCollaborationRequest.getIsAccepted()) this.privateCollaborationService.createPrivateCollaboration(privateCollaborationRequest);

        this.privateCollaborationRequestService.deleteCollaborationRequest(privateCollaborationRequest);

        return this.notificationService.addPrivateCollaborationRequestResponseNotification(privateCollaborationRequest);
    }
}
