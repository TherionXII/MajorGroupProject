package project.webcollaborationtool.Collaboration.Request.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.webcollaborationtool.Collaboration.Request.Repositories.PrivateCollaborationRequestRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;

import javax.validation.constraints.NotNull;
import java.util.Collection;

@Service
@Transactional
public class PrivateCollaborationRequestService
{
    @Autowired
    private PrivateCollaborationRequestRepository privateCollaborationRequestRepository;

    public Collection<PrivateCollaborationRequest> getRequestsForUser(String username)
    {
        return this.privateCollaborationRequestRepository.findAllByRecipient(username);
    }

    public void createPrivateCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest)
    {
        this.privateCollaborationRequestRepository.save(privateCollaborationRequest);
    }

    public void deleteCollaborationRequest(PrivateCollaborationRequest privateCollaborationRequest)
    {
        this.privateCollaborationRequestRepository.deleteBySenderAndRecipient(privateCollaborationRequest.getSender(), privateCollaborationRequest.getRecipient());
    }

    public boolean existsBySenderAndRecipient(String sender, String recipient)
    {
        return this.privateCollaborationRequestRepository.existsBySenderAndRecipient(sender, recipient);
    }
}
