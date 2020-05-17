package project.webcollaborationtool.Query.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Exceptions.InvalidQueryDataException;
import project.webcollaborationtool.Query.Repositories.PublicQueryRepository;
import project.webcollaborationtool.Query.Repositories.ResponseRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PublicQueryServiceTests
{
    @Mock
    private PublicQueryRepository publicQueryRepository;

    @Mock
    private ResponseRepository responseRepository;

    @InjectMocks
    private PublicQueryService publicQueryService;

    @Test
    public void testGetRecentQueries()
    {
        when(this.publicQueryRepository.findAll()).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.publicQueryService.getRecentQueries()).doesNotThrowAnyException();
    }

    @Test
    public void testGetRecentQueriesForUser()
    {
        when(this.publicQueryRepository.findTop10ByUsernameOrderByCreatedAtDesc(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.publicQueryService.getRecentQueriesForUser("username")).doesNotThrowAnyException();
    }

    @Test
    public void testGetRecentResponsesForUser()
    {
        when(this.responseRepository.findTop10ByUsernameOrderByCreatedAtDesc(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.publicQueryService.getRecentResponsesForUser("username")).doesNotThrowAnyException();
    }

    @Test
    public void testCreateQuery()
    {
        when(this.publicQueryRepository.save(any())).thenReturn(new PublicQuery());

        assertThatCode(() -> this.publicQueryService.createQuery(new PublicQuery(), "username")).doesNotThrowAnyException();
    }


}
