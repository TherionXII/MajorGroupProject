package project.webcollaborationtool.Repositories.Query;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.Queries.QueryVote;

@Repository
public interface QueryVoteRepository extends CrudRepository<QueryVote, Integer>
{
}
