package project.webcollaborationtool.Collaboration.Request.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Services.GroupCollaborationRequestService;
import project.webcollaborationtool.Collaboration.Request.Services.PrivateCollaborationRequestService;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Services.NotificationService;

@RestController
public class RequestMessagingController
{
    @Autowired
    private NotificationService notificationService;

    @Autowired
    private GroupCollaborationRequestService groupCollaborationRequestService;

    @Autowired
    private PrivateCollaborationRequestService privateCollaborationRequestService;

    @SendTo("/topic/user/notification/{recipient}")
    @MessageMapping("/user/collaboration/invitation/{recipient}")
    public Notification createGroupCollaborationRequest(GroupCollaborationRequest groupCollaborationRequest)
    {
        this.groupCollaborationRequestService.createGroupCollaborationRequest(groupCollaborationRequest);
        return this.notificationService.addGroupCollaborationRequest(groupCollaborationRequest);
    }

    @SendTo("/topic/user/notification/{recipient}")
    @MessageMapping("/user/collaboration/request/{recipient}")
    public Notification createPrivateCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest)
    {
        this.privateCollaborationRequestService.createPrivateCollaborationRequest(privateCollaborationRequest);
        return this.notificationService.addPrivateCollaborationRequestNotification(privateCollaborationRequest);
    }
}
