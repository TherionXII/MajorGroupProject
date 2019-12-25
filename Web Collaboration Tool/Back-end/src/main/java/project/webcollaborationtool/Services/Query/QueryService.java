package project.webcollaborationtool.Services.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.Queries.ParentQueryData;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Entities.Queries.QueryData;
import project.webcollaborationtool.Repositories.Query.QueryRepository;
import project.webcollaborationtool.Repositories.User.UserRepository;

import javax.validation.constraints.NotNull;
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
        return this.queryRepository.findFirst10ByParentOrderByCreatedAtDesc(null);
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

    public void submitResponse(String response, String username, Integer queryId)
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
