package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.ParentQueryData;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.QueryData;
import project.webcollaborationtool.Query.Repositories.QueryRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class QueryService
{
    @Autowired
    private QueryRepository queryRepository;

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
}
