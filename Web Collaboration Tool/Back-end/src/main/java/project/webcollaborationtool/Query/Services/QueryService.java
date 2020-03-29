package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Repositories.QueryRepository;

import javax.validation.constraints.NotNull;

@Service
public class QueryService
{
    @Autowired
    private QueryRepository queryRepository;

    public Query getQueryById(@NotNull int id)
    {
        return this.queryRepository.findById(id).orElseThrow();
    }

}
