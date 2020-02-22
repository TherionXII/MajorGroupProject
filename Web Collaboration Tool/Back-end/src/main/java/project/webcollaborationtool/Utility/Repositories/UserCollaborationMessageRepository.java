package project.webcollaborationtool.Utility.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Utility.Entities.UserCollaborationMessage;

import java.util.Collection;

public interface UserCollaborationMessageRepository extends JpaRepository<UserCollaborationMessage, Integer>
{
    Collection<UserCollaborationMessage> findAllBySender(String sender);
}