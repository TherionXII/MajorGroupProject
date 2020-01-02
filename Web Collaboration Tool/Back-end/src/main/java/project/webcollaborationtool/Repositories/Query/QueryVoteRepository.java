package project.webcollaborationtool.Repositories.Query;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Entities.Queries.QueryVote;
import project.webcollaborationtool.Entities.User.User;

import java.util.Collection;

@Repository
public interface QueryVoteRepository extends CrudRepository<QueryVote, Integer>
{
    QueryVote findByUserAndQuery(User user, Query query);
    Collection<QueryVote> findAllByQuery(Query query);
}
