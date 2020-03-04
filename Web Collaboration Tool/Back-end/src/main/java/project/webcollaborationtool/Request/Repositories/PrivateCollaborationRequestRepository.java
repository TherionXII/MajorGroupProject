package project.webcollaborationtool.Request.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Request.Entities.PrivateCollaborationRequest;

public interface PrivateCollaborationRequestRepository extends JpaRepository<PrivateCollaborationRequest, Integer>
{
    Boolean existsBySenderAndRecipient(String sender, String recipient);
}
