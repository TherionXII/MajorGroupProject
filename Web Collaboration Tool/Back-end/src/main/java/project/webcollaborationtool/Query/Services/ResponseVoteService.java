package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.ResponseVote;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Exceptions.InvalidQueryDataException;
import project.webcollaborationtool.Query.Repositories.ResponseVoteRepository;
import project.webcollaborationtool.Query.Repositories.ResponseRepository;

import javax.validation.constraints.NotNull;

@Service
public class ResponseVoteService
{
    @Autowired
    private ResponseVoteRepository responseVoteRepository;

    @Autowired
    private ResponseRepository responseRepository;

    public Response vote(@NotNull ResponseVote responseVote, @NotNull Integer responseId)
    {
        var response = this.responseRepository.findById(responseId).orElseThrow(InvalidQueryDataException::new);

        responseVote.setResponseId(response.getId());
        responseVote.setResponse(response);

        response.getVotes().add(responseVote);
        response.setRating(0);

        return this.updateQueryRating(response);
    }

    private Response updateQueryRating(Response response)
    {
        this.responseVoteRepository.findAllByResponse(response)
                                .forEach(responseVote ->
                                {
                                    if(responseVote.getVote())
                                        response.setRating(response.getRating() + 1);
                                    else
                                        response.setRating(response.getRating() - 1);
                                });

        return this.responseRepository.save(response);
    }
}
