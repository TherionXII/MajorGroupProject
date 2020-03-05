package project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Utility.CompositeKeys.PrivateCollaborationId;

import java.util.Collection;

public interface PrivateCollaborationRepository extends JpaRepository<PrivateCollaboration, PrivateCollaborationId>
{
    Collection<PrivateCollaboration> findAllByCollaboratorOneUsernameOrCollaboratorTwoUsername(String collaboratorOneUsername, String collaboratorTwoUsername);
}
