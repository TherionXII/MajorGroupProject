package project.webcollaborationtool.Collaboration.Thread.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>
{
}
