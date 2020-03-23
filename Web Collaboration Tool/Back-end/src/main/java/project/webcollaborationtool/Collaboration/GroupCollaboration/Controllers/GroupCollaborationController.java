package project.webcollaborationtool.Collaboration.GroupCollaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Services.GroupCollaborationService;
import project.webcollaborationtool.Collaboration.Thread.Services.ThreadService;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Services.NotificationService;

import java.util.Collection;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupCollaborationController
{
    @Autowired
    private GroupCollaborationService groupCollaborationService;

    @Autowired
    private ThreadService threadService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/{username}/createGroup")
    @CrossOrigin(origins = "/groups", methods = RequestMethod.POST)
    public ResponseEntity<GroupCollaboration> createGroup(@RequestBody GroupCollaboration groupCollaboration, @PathVariable String username)
    {
        var group = this.groupCollaborationService.createGroup(groupCollaboration, username);
        group = this.threadService.createGroupThread(group.getId());
        return ResponseEntity.ok().body(group);
    }

    @GetMapping("/{username}/getGroups")
    @CrossOrigin(origins = "/groups", methods = RequestMethod.GET)
    public ResponseEntity<Collection<GroupCollaboration>> getGroupsForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.groupCollaborationService.getGroupsForUser(username));
    }

    @GetMapping("/{groupId}/getGroup")
    @CrossOrigin(origins = "/group/{groupId}", methods = RequestMethod.GET)
    public ResponseEntity<GroupCollaboration> getGroupById(@PathVariable Integer groupId)
    {
        return ResponseEntity.ok().body(this.groupCollaborationService.getGroupById(groupId));
    }

    @CrossOrigin(origins = "/group/*")
    @SendTo("/topic/user/collaboration/group/{username}")
    @MessageMapping("/user/collaboration/makeAdmin/{groupId}/{username}")
    public Notification makeAdmin(@DestinationVariable Integer groupId, @DestinationVariable String username)
    {
        this.groupCollaborationService.makeAdmin(groupId, username);

        return this.notificationService.addGroupAdminPromotionNotification(groupId, username);
    }

    @CrossOrigin(origins = "/group/*")
    @SendTo("/topic/user/collaboration/group/{username}")
    @MessageMapping("/user/collaboration/removeFromGroup/{groupId}/{username}")
    public Notification removeFromGroup(@DestinationVariable Integer groupId, @DestinationVariable String username)
    {
        this.groupCollaborationService.removeFromGroup(groupId, username);

        return this.notificationService.addGroupRemovalNotification(groupId, username);
    }
}
