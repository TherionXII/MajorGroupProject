package project.webcollaborationtool.Query.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Query.Entities.GroupQuery;

import java.util.Collection;

@Repository
public interface GroupQueryRepository extends JpaRepository<GroupQuery, Integer>
{
    Collection<GroupQuery> findTop10ByGroupCollaborationOrderByCreatedAtDesc(GroupCollaboration groupCollaboration);
}
