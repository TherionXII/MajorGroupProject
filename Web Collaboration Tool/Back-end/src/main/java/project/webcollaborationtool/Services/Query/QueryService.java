package project.webcollaborationtool.Services.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Repositories.Query.QueryRepository;
import project.webcollaborationtool.Repositories.User.UserRepository;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;

@Service
public class QueryService
{
    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private UserRepository userRepository;

    public Collection<Query> getAllParentQueries()
    {
        var queries = new ArrayList<Query>();

        this.queryRepository.findAll().forEach(query ->
        {
            if(query.getParent() == null)
                queries.add(query);
        });

        queries.sort(Comparator.comparing(Query::getCreatedAt));

        return queries;
    }

    public void createParentQuery(@NotNull Query query, @NotNull String username)
    {
        query.setUser(this.userRepository.findByUsername(username));
        query.setParent(null);
        query.setChildren(null);

        this.queryRepository.save(query);
    }

    public Query getLastQueryForUser(@NotNull String username)
    {
        return this.queryRepository.findTopByUser(this.userRepository.findByUsername(username));
    }

    public Query getQueryById(@NotNull int id)
    {
        return this.queryRepository.findById(id).orElseThrow();
    }
}
