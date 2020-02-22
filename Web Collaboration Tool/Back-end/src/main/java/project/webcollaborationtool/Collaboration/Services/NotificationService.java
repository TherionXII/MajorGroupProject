package project.webcollaborationtool.Collaboration.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Utility.Repositories.UserCollaborationMessageRepository;

@Service
public class NotificationService
{
    @Autowired
    private UserCollaborationMessageRepository userCollaborationMessageRepository;

    public boolean hasSentCollaborationRequest(String sender, String recipient)
    {
        for(var message : this.userCollaborationMessageRepository.findAllBySender(sender))
            if(message.getRecipient().equals(recipient))
                return true;

        return false;
    }

    public boolean hasReceivedCollaborationRequest(String recipient, String sender)
    {
        for(var message : this.userCollaborationMessageRepository.findAllBySender(sender))
            if(message.getRecipient().equals(recipient))
                return true;

        return false;
    }
}
