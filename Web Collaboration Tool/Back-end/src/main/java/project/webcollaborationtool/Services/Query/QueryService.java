package project.webcollaborationtool.Services.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.Queries.ParentQueryData;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Entities.Queries.QueryData;
import project.webcollaborationtool.Entities.Queries.QueryVote;
import project.webcollaborationtool.Repositories.Query.QueryRepository;
import project.webcollaborationtool.Repositories.Query.QueryVoteRepository;
import project.webcollaborationtool.Repositories.User.UserRepository;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class QueryService
{
    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private QueryVoteRepository queryVoteRepository;

    @Autowired
    private UserRepository userRepository;

    public Collection<Query> getRecentQueries()
    {
        return this.queryRepository.findTop10ByParentOrderByCreatedAtDesc(null);
    }

    public Collection<Query> getRecentQueriesForUser(@NotNull String username)
    {
        return this.queryRepository.findTop10ByUserAndParentOrderByCreatedAtDesc(this.userRepository.findByUsername(username), null);
    }

    public Collection<Integer> getRecentResponsesForUser(@NotNull String username)
    {
        var responses = new ArrayList<Integer>();
        this.queryRepository.findTop10ByUserOrderByCreatedAtDesc(this.userRepository.findByUsername(username))
                            .forEach(query ->
                            {
                                if(query.getParent() != null) responses.add(query.getId());
                            });
        return responses;
    }

    public int createParentQuery(@NotNull QueryData queryData, @NotNull String username)
    {
        var query = new Query();
        query.setUser(this.userRepository.findByUsername(username));
        query.setParent(null);
        query.setChildren(null);
        query.setQueryData(queryData);

        queryData.setQuery(query);

        return this.queryRepository.save(query).getId();
    }

    public int createParentQueryData(@NotNull ParentQueryData parentQueryData, @NotNull Integer id)
    {
        var query = this.queryRepository.findById(id).orElseThrow();

        query.setParentQueryData(parentQueryData);
        parentQueryData.setQuery(query);

        return this.queryRepository.save(query).getId();
    }

    public Query getQueryById(@NotNull int id)
    {
        return this.queryRepository.findById(id).orElseThrow();
    }

    public void submitResponse(@NotNull String response, @NotNull String username, @NotNull Integer queryId)
    {
        var query = new Query();
        query.setUser(this.userRepository.findByUsername(username));
        query.setParent(this.queryRepository.findById(queryId).orElseThrow());
        query.setChildren(null);

        var queryData = new QueryData();
        queryData.setContents(response);
        queryData.setRating(0);
        queryData.setQuery(query);

        query.setQueryData(queryData);

        this.queryRepository.save(query);
    }

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
