package project.webcollaborationtool.Repositories.Query;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Entities.User.User;

import javax.validation.constraints.NotNull;
import java.util.Collection;

@Repository
public interface QueryRepository extends CrudRepository<Query, Integer>
{
    public Query findFirstByUser(@NotNull User user);
    public Collection<Query> findAllByParent(@NotNull Query query);
    public Query findTopByUser(@NotNull User user);
}
