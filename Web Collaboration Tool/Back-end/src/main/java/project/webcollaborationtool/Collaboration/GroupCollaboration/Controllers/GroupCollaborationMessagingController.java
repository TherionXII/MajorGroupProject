package project.webcollaborationtool.Collaboration.GroupCollaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Services.GroupCollaborationService;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Services.NotificationService;

@RestController
public class GroupCollaborationMessagingController
{
    @Autowired
    private GroupCollaborationService groupCollaborationService;

    @Autowired
    private NotificationService notificationService;

    @SendTo("/topic/user/notification/{username}")
    @MessageMapping("/user/collaboration/makeAdmin/{groupId}/{username}")
    public Notification makeAdmin(@DestinationVariable Integer groupId, @DestinationVariable String username)
    {
        this.groupCollaborationService.makeAdmin(groupId, username);

        return this.notificationService.addGroupAdminPromotionNotification(groupId, username);
    }

    @SendTo("/topic/user/notification/{username}")
    @MessageMapping("/user/collaboration/removeFromGroup/{groupId}/{username}")
    public Notification removeFromGroup(@DestinationVariable Integer groupId, @DestinationVariable String username)
    {
        this.groupCollaborationService.removeFromGroup(groupId, username);

        return this.notificationService.addGroupRemovalNotification(groupId, username);
    }
}
