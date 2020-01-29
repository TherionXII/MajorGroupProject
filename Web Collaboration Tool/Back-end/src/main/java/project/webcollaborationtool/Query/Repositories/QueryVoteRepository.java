package project.webcollaborationtool.Query.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.QueryVote;
import project.webcollaborationtool.User.Entities.User;

import java.util.Collection;

@Repository
public interface QueryVoteRepository extends CrudRepository<QueryVote, Integer>
{
    QueryVote findByUserAndQuery(User user, Query query);
    Collection<QueryVote> findAllByQuery(Query query);
}
