package project.webcollaborationtool.Query.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Query.Entities.ResponseVote;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Utility.CompositeKeys.ResponseVoteId;

import java.util.Collection;

@Repository
public interface ResponseVoteRepository extends CrudRepository<ResponseVote, ResponseVoteId>
{
    Collection<ResponseVote> findAllByResponse(Response response);
}
