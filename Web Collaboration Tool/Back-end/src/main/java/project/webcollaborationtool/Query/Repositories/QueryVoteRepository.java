package project.webcollaborationtool.Query.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.QueryVote;
import project.webcollaborationtool.Utility.CompositeKeys.QueryVoteId;

import java.util.Collection;

@Repository
public interface QueryVoteRepository extends CrudRepository<QueryVote, QueryVoteId>
{
    Boolean existsByUsernameAndQuery(String username, Query query);
    QueryVote findByUsernameAndQuery(String username, Query query);
    Collection<QueryVote> findAllByQuery(Query query);
}
