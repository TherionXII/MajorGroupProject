package project.webcollaborationtool.Collaboration.Paper.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;

import java.util.Collection;

public interface PaperRepository extends JpaRepository<Paper, Integer>
{
    Collection<Paper> findAllByGroupCollaboration(GroupCollaboration groupCollaboration);
}
