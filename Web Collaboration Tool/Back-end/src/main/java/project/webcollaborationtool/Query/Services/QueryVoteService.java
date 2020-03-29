package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.QueryVote;
import project.webcollaborationtool.Query.Exceptions.InvalidQueryDataException;
import project.webcollaborationtool.Query.Exceptions.UnexpectedQueryVoteNullPointerException;
import project.webcollaborationtool.Query.Repositories.QueryRepository;
import project.webcollaborationtool.Query.Repositories.QueryVoteRepository;

import javax.validation.constraints.NotNull;

@Service
public class QueryVoteService
{
    @Autowired
    private QueryVoteRepository queryVoteRepository;

    @Autowired
    private QueryRepository queryRepository;

    public Query vote(@NotNull QueryVote queryVote, @NotNull Integer queryId)
    {
        var query = this.queryRepository.findById(queryId).orElseThrow(InvalidQueryDataException::new);

//        if(!this.queryVoteRepository.existsByUsernameAndQuery(queryVote.getUsername(), query) ||
//            this.queryVoteRepository.findByUsernameAndQuery(queryVote.getUsername(), query).getVote() != queryVote.getVote())
//        {
//            queryVote.setQuery(query);
//            this.queryVoteRepository.save(queryVote);
//
//            query.setRating(0);
//            return this.updateQueryRating(query);
//        }

        queryVote.setQuery(query);
        this.queryVoteRepository.save(queryVote);
        query.setRating(0);

        return this.updateQueryRating(query);
    }

    private Query updateQueryRating(Query query)
    {
        this.queryVoteRepository.findAllByQuery(query)
                                .forEach(queryVote ->
                                {
                                    if(queryVote.getVote() == null)
                                        throw new UnexpectedQueryVoteNullPointerException();
                                    else if(queryVote.getVote())
                                        query.setRating(query.getRating() + 1);
                                    else
                                        query.setRating(query.getRating() - 1);
                                });

        return this.queryRepository.save(query);
    }
}
