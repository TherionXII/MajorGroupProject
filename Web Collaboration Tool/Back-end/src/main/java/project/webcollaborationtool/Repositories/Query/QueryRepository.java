package project.webcollaborationtool.Repositories.Query;

import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Entities.User.User;

import javax.validation.constraints.NotNull;
import java.util.Collection;

@Repository
public interface QueryRepository extends CrudRepository<Query, Integer>
{
    Collection<Query> findTop10ByParentOrderByCreatedAtDesc(Query parent);
    Collection<Query> findTop10ByUserOrderByCreatedAtDesc(User user);
    Collection<Query> findTop10ByUserAndParentOrderByCreatedAtDesc(User user, Query parent);
}
