package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Exceptions.InvalidQueryDataException;
import project.webcollaborationtool.Query.Repositories.PublicQueryRepository;
import project.webcollaborationtool.Query.Repositories.ResponseRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class PublicQueryService
{
    @Autowired
    private PublicQueryRepository publicQueryRepository;

    @Autowired
    private ResponseRepository responseRepository;

    public Collection<PublicQuery> getRecentQueries()
    {
        return this.publicQueryRepository.findAll();
    }

    public Collection<PublicQuery> getRecentQueriesForUser(@NotNull String username)
    {
        return this.publicQueryRepository.findTop10ByUsernameOrderByCreatedAtDesc(username);
    }

    public Collection<Response> getRecentResponsesForUser(@NotNull String username)
    {
        return this.responseRepository.findTop10ByUsernameOrderByCreatedAtDesc(username);
    }

    public PublicQuery createQuery(PublicQuery query, String username)
    {
        query.setUsername(username);
        query.setResponses(new ArrayList<>());

        return this.publicQueryRepository.save(query);
    }


}
