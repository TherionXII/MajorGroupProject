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
        return this.userCollaborationMessageRepository.existsBySenderAndRecipient(sender, recipient);
    }

    public boolean hasReceivedCollaborationRequest(String recipient, String sender)
    {
        return this.userCollaborationMessageRepository.existsByRecipientAndSender(recipient, sender);
    }
}
