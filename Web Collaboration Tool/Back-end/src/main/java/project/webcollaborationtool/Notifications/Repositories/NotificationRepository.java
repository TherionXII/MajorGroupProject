package project.webcollaborationtool.Notifications.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Notifications.Entities.Notification;

import java.util.Collection;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer>
{
}