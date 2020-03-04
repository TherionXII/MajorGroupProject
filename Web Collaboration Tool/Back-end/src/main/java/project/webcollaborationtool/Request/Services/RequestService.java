package project.webcollaborationtool.Request.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Request.Repositories.PrivateCollaborationRequestRepository;

import javax.validation.constraints.NotNull;

@Service
public class RequestService
{
    @Autowired
    private PrivateCollaborationRequestRepository privateCollaborationRequestRepository;

    public void createPrivateCollaborationRequest(@NotNull PrivateCollaborationRequest privateCollaborationRequest)
    {
        this.privateCollaborationRequestRepository.save(privateCollaborationRequest);
    }

    public void respondToCollaborationRequest(@NotNull PrivateCollaborationRequest privateCollaborationRequest)
    {
        this.privateCollaborationRequestRepository.delete(privateCollaborationRequest);
    }

    public boolean existsBySenderAndRecipient(String sender, String recipient)
    {
        return this.privateCollaborationRequestRepository.existsBySenderAndRecipient(sender, recipient);
    }
}
