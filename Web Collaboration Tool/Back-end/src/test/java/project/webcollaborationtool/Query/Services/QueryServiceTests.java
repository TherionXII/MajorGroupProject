package project.webcollaborationtool.Query.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Exceptions.InvalidQueryDataException;
import project.webcollaborationtool.Query.Repositories.QueryRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class QueryServiceTests
{
    @Mock
    private QueryRepository queryRepository;

    @InjectMocks
    private QueryService queryService;

    @Test
    public void testGetQueryByIdWithValidQuery()
    {
        when(this.queryRepository.findById(any())).thenReturn(Optional.of(new Query()));

        assertThatCode(() -> this.queryService.getQueryById(0)).doesNotThrowAnyException();
    }

    @Test
    public void testGetQueryByIdWithInvalidQuery()
    {
        when(this.queryRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.queryService.getQueryById(0)).isInstanceOf(InvalidQueryDataException.class);
    }

    @Test
    public void testCreateResponseWithValidData()
    {
        var query = new PublicQuery();
        query.setResponses(new ArrayList<>());
        when(this.queryRepository.findById(any())).thenReturn(Optional.of(query));
        when(this.queryRepository.save(any())).thenReturn(query);

        assertThatCode(() -> this.queryService.createResponse(new Response(), "username", 0)).doesNotThrowAnyException();
    }

    @Test
    public void testCreateResponseWithInvalidData()
    {
        when(this.queryRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.queryService.createResponse(new Response(), "username", 0)).isInstanceOf(InvalidQueryDataException.class);
    }
}
