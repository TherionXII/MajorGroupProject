package project.webcollaborationtool.Collaboration.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.Entities.UserToUserCollaboration;
import project.webcollaborationtool.Utility.CompositeKeys.UserToUserId;

public interface UserToUserCollaborationRepository extends JpaRepository<UserToUserCollaboration, UserToUserId>
{
}
