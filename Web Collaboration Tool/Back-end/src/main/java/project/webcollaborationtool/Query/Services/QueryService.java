package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.Query;
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

    public Query getQueryById(@NotNull int id)
    {
        return this.queryRepository.findById(id).orElseThrow();
    }

    public Query createQuery(@NotNull Query query, @NotNull String username)
    {
        query.setUser(this.userRepository.findByUsername(username));
        query.setParent(null);
        query.setChildren(null);
        query.setRating(0);

        return this.queryRepository.save(query);
    }

    public Query createResponse(@NotNull Query response, @NotNull String username, @NotNull Integer parentId)
    {
        response.setUser(this.userRepository.findByUsername(username));
        response.setParent(this.queryRepository.findById(parentId).orElseThrow());
        response.setChildren(null);
        response.setRating(0);

        this.queryRepository.save(response);

        return this.queryRepository.findById(parentId).orElseThrow();
    }
}
