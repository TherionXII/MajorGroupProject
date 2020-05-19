package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Exceptions.InvalidQueryDataException;
import project.webcollaborationtool.Query.Repositories.QueryRepository;

import javax.validation.constraints.NotNull;

@Service
public class QueryService
{
    @Autowired
    private QueryRepository queryRepository;

    public Query getQueryById(@NotNull Integer id)
    {
        return this.queryRepository.findById(id).orElseThrow(InvalidQueryDataException::new);
    }

    public Query createResponse(Response response, String username, Integer parentId)
    {
        var parent = this.queryRepository.findById(parentId).orElseThrow(InvalidQueryDataException::new);

        response.setUsername(username);
        response.setParent(parent);
        response.setRating(0);

        parent.getResponses().add(response);

        return this.queryRepository.save(parent);
    }
}
