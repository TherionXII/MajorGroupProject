package project.webcollaborationtool.Request.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Request.Entities.GroupCollaborationRequest;

import java.util.Collection;

@Repository
public interface GroupCollaborationRequestRepository extends JpaRepository<GroupCollaborationRequest, Integer>
{
    Collection<GroupCollaborationRequest> findAllByRecipient(String recipient);
    Collection<GroupCollaborationRequest> findAllByGroupId(Integer groupId);
}
