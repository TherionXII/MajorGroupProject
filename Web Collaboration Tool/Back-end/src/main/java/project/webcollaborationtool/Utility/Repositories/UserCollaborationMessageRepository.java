package project.webcollaborationtool.Utility.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Utility.Entities.UserCollaborationNotification;

public interface UserCollaborationMessageRepository extends JpaRepository<UserCollaborationNotification, Integer>
{
    Boolean existsBySenderAndRecipient(String sender, String recipient);
    Boolean existsByRecipientAndSender(String recipient, String sender);
    void deleteBySenderAndRecipient(String sender, String recipient);
}