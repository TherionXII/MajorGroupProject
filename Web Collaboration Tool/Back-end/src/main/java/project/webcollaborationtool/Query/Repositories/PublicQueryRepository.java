package project.webcollaborationtool.Query.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.User.Entities.User;

import java.util.Collection;

public interface PublicQueryRepository extends JpaRepository<PublicQuery, Integer>
{
    Collection<PublicQuery> findTop10ByParentOrderByCreatedAtDesc(Query parent);
    Collection<PublicQuery> findTop10ByUserAndParentOrderByCreatedAtDesc(User user, Query parent);
    Collection<PublicQuery> findTop10ByUserAndParentIsNotNullOrderByCreatedAtDesc(User user);
}
