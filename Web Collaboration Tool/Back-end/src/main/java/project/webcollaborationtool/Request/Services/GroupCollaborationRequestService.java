package project.webcollaborationtool.Request.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Request.Repositories.GroupCollaborationRequestRepository;

import java.util.Collection;

@Service
public class GroupCollaborationRequestService
{
    @Autowired
    private GroupCollaborationRequestRepository groupCollaborationRequestRepository;

    public void createRequest(GroupCollaborationRequest groupCollaborationRequest)
    {
        this.groupCollaborationRequestRepository.save(groupCollaborationRequest);
    }

    public Collection<GroupCollaborationRequest> getGroupInvitationsForUser(String username)
    {
        return this.groupCollaborationRequestRepository.findAllByRecipient(username);
    }

    public void deleteRequest(GroupCollaborationRequest groupCollaborationRequest)
    {
        this.groupCollaborationRequestRepository.deleteById(groupCollaborationRequest.getId());
    }

    public Collection<GroupCollaborationRequest> getGroupInvitationsForGroup(Integer groupId)
    {
        return this.groupCollaborationRequestRepository.findAllByGroupId(groupId);
    }
}
