package project.webcollaborationtool.Collaboration.Request.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Services.GroupCollaborationService;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Services.GroupCollaborationRequestService;

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

    @GetMapping("/{recipient}/getGroupInvitationsForUser")
    @CrossOrigin(origins = "/groups", methods = RequestMethod.GET)
    public ResponseEntity<Collection<GroupCollaborationRequest>> getGroupInvitationsForUser(@PathVariable String recipient)
    {
        return ResponseEntity.ok().body(this.groupCollaborationRequestService.getGroupInvitationsForUser(recipient));
    }

    @PostMapping("/respond")
    @CrossOrigin(origins = "/groups", methods = RequestMethod.POST)
    public ResponseEntity<Integer> respondToInvitation(@RequestBody GroupCollaborationRequest groupCollaborationRequest)
    {
        if(groupCollaborationRequest.getIsAccepted())
            this.groupCollaborationService.addMember(groupCollaborationRequest.getGroupId(), groupCollaborationRequest.getRecipient());
        this.groupCollaborationRequestService.deleteRequest(groupCollaborationRequest);

        return ResponseEntity.ok().body(groupCollaborationRequest.getGroupId());
    }

    @GetMapping("/{groupId}/getGroupInvitationsForGroup")
    @CrossOrigin(origins = "/group/*", methods = RequestMethod.GET)
    public ResponseEntity<Collection<GroupCollaborationRequest>> getGroupInvitationsForGroup(@PathVariable Integer groupId)
    {
        return ResponseEntity.ok().body(this.groupCollaborationRequestService.getGroupInvitationsForGroup(groupId));
    }
}
