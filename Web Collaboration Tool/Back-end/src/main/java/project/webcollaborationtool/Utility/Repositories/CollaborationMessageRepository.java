package project.webcollaborationtool.Utility.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Utility.Entities.Notification;

@Repository
public interface CollaborationMessageRepository extends JpaRepository<Notification, Integer> {}