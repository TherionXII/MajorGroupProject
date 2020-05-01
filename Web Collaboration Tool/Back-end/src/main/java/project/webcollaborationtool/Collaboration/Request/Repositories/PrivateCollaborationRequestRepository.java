package project.webcollaborationtool.Collaboration.Request.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;

import java.util.Collection;

@Repository
public interface PrivateCollaborationRequestRepository extends JpaRepository<PrivateCollaborationRequest, Integer>
{
    Collection<PrivateCollaborationRequest> findAllByRecipient(String recipient);

    Boolean existsBySenderAndRecipient(String sender, String recipient);
    PrivateCollaborationRequest findBySenderAndRecipient(String sender, String recipient);
}
