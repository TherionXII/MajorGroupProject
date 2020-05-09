package project.webcollaborationtool.Collaboration.Request.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Services.GroupCollaborationService;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Services.GroupCollaborationRequestService;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Services.NotificationService;

import java.util.Collection;

@RestController
@RequestMapping("/api/groupRequests")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupCollaborationRequestController
{
    @Autowired
    private GroupCollaborationService groupCollaborationService;

    @Autowired
    private GroupCollaborationRequestService groupCollaborationRequestService;

    @Autowired
    private NotificationService notificationService;

    @CrossOrigin(origins = "/group/*")
    @SendTo("/topic/user/notification/{recipient}")
    @MessageMapping("/user/collaboration/invitation/{recipient}")
    public Notification createCollaborationRequest(GroupCollaborationRequest groupCollaborationRequest)
    {
        this.groupCollaborationRequestService.createRequest(groupCollaborationRequest);
        return this.notificationService.addGroupCollaborationRequest(groupCollaborationRequest);
    }

    @CrossOrigin(origins = "/groups")
    @GetMapping("/{recipient}/getGroupInvitationsForUser")
    public ResponseEntity<Collection<GroupCollaborationRequest>> getGroupInvitationsForUser(@PathVariable String recipient)
    {
        return ResponseEntity.ok().body(this.groupCollaborationRequestService.getGroupInvitationsForUser(recipient));
    }

    @PostMapping("/respond")
    @CrossOrigin(origins = "/groups")
    public ResponseEntity<Integer> respondToInvitation(@RequestBody GroupCollaborationRequest groupCollaborationRequest)
    {
        if(groupCollaborationRequest.getIsAccepted())
            this.groupCollaborationService.addMember(groupCollaborationRequest.getGroupId(), groupCollaborationRequest.getRecipient());
        this.groupCollaborationRequestService.deleteRequest(groupCollaborationRequest);

        return ResponseEntity.ok().body(groupCollaborationRequest.getGroupId());
    }

    @CrossOrigin("/group/*")
    @GetMapping("/{groupId}/getGroupInvitationsForGroup")
    public ResponseEntity<Collection<GroupCollaborationRequest>> getGroupInvitationsForGroup(@PathVariable Integer groupId)
    {
        return ResponseEntity.ok().body(this.groupCollaborationRequestService.getGroupInvitationsForGroup(groupId));
    }
}
