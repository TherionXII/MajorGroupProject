package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.QueryVote;
import project.webcollaborationtool.Query.Repositories.QueryRepository;
import project.webcollaborationtool.Query.Repositories.QueryVoteRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class QueryVoteService
{
    @Autowired
    private QueryVoteRepository queryVoteRepository;

    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private UserRepository userRepository;

    public Query vote(@NotNull Boolean vote, @NotNull String username, @NotNull Integer queryId)
    {
        var queryVote = this.queryVoteRepository.findByUserAndQuery(this.userRepository.findByUsername(username), this.queryRepository.findById(queryId).orElseThrow());

        if (queryVote == null)
        {
            queryVote = new QueryVote();
            queryVote.setUser(this.userRepository.findByUsername(username));
            queryVote.setQuery(this.queryRepository.findById(queryId).orElseThrow());
        }

        queryVote.setVote(vote);
        this.queryVoteRepository.save(queryVote);

        return this.updateQueryRating(queryId);
    }

    private Query updateQueryRating(Integer queryId)
    {
        var query = this.queryRepository.findById(queryId).orElseThrow();
        var queryVotes = this.queryVoteRepository.findAllByQuery(query);

        var rating = 0;

        for(var queryVote : queryVotes)
            if(queryVote.getVote()) query.getQueryData().setRating(++rating);
            else query.getQueryData().setRating(--rating);

        this.queryRepository.save(query);

        return query;
    }
}
