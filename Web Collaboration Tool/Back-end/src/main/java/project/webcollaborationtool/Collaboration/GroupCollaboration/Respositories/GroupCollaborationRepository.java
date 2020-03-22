package project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

@Repository
public interface GroupCollaborationRepository extends JpaRepository<GroupCollaboration, Integer>
{
}
