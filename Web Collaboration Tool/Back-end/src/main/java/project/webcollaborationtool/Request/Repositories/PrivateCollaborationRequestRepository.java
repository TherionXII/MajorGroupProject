package project.webcollaborationtool.Request.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Request.Entities.PrivateCollaborationRequest;

import java.util.Collection;

public interface PrivateCollaborationRequestRepository extends JpaRepository<PrivateCollaborationRequest, Integer>
{
    Collection<PrivateCollaborationRequest> findAllByRecipient(String recipient);

    Boolean existsBySenderAndRecipient(String sender, String recipient);
    PrivateCollaborationRequest findBySenderAndRecipient(String sender, String recipient);
}
