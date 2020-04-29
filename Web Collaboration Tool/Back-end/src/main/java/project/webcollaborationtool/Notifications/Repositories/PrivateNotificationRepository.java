package project.webcollaborationtool.Notifications.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Notifications.Entities.PrivateNotification;
import project.webcollaborationtool.User.Entities.User;

import java.util.Collection;

public interface PrivateNotificationRepository extends JpaRepository<PrivateNotification, Integer>
{
    Collection<PrivateNotification> findAllByRecipientOrderByCreatedAtDesc(User username);
}
