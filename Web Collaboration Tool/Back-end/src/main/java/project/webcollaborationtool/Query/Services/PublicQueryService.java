package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Repositories.PublicQueryRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.constraints.NotNull;
import java.util.Collection;

@Service
public class PublicQueryService
{
    @Autowired
    private PublicQueryRepository publicQueryRepository;

    @Autowired
    private UserRepository userRepository;

    public Collection<PublicQuery> getRecentQueries()
    {
        return this.publicQueryRepository.findTop10ByParentOrderByCreatedAtDesc(null);
    }

    public Collection<PublicQuery> getRecentQueriesForUser(@NotNull String username)
    {
        return this.publicQueryRepository.findTop10ByUserAndParentOrderByCreatedAtDesc(this.userRepository.findByUsername(username), null);
    }

    public Collection<PublicQuery> getRecentResponsesForUser(@NotNull String username)
    {
        return this.publicQueryRepository.findTop10ByUserAndParentIsNotNullOrderByCreatedAtDesc(this.userRepository.findByUsername(username));
    }

    public PublicQuery createQuery(@NotNull PublicQuery query, @NotNull String username)
    {
        query.setUser(this.userRepository.findByUsername(username));
        query.setParent(null);
        query.setChildren(null);
        query.setRating(0);

        return this.publicQueryRepository.save(query);
    }

    public PublicQuery createResponse(@NotNull PublicQuery response, @NotNull String username, @NotNull Integer parentId)
    {
        response.setUser(this.userRepository.findByUsername(username));
        response.setParent(this.publicQueryRepository.findById(parentId).orElseThrow());
        response.setChildren(null);
        response.setRating(0);

        return this.publicQueryRepository.save(response);
    }
}
