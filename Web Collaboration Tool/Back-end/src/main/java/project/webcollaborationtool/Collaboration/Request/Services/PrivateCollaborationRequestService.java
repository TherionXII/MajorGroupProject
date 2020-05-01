package project.webcollaborationtool.Request.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Request.Repositories.PrivateCollaborationRequestRepository;

import javax.validation.constraints.NotNull;
import java.util.Collection;

@Service
public class PrivateCollaborationRequestService
{
    @Autowired
    private PrivateCollaborationRequestRepository privateCollaborationRequestRepository;

    public Collection<PrivateCollaborationRequest> getRequestsForUser(String username)
    {
        return this.privateCollaborationRequestRepository.findAllByRecipient(username);
    }

    public void createPrivateCollaborationRequest(@NotNull PrivateCollaborationRequest privateCollaborationRequest)
    {
        this.privateCollaborationRequestRepository.save(privateCollaborationRequest);
    }

    public void deleteCollaborationRequest(@NotNull PrivateCollaborationRequest privateCollaborationRequest)
    {
        var id = this.privateCollaborationRequestRepository.findBySenderAndRecipient(privateCollaborationRequest.getSender(), privateCollaborationRequest.getRecipient()).getId();
        this.privateCollaborationRequestRepository.deleteById(id);
    }

    public boolean existsBySenderAndRecipient(String sender, String recipient)
    {
        return this.privateCollaborationRequestRepository.existsBySenderAndRecipient(sender, recipient);
    }
}
