package project.webcollaborationtool.Collaboration.Thread.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.ChatThread;

public interface ChatThreadRepository extends JpaRepository<ChatThread, Integer>
{
}
