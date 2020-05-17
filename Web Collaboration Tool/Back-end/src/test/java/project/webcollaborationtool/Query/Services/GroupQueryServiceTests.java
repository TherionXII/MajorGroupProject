package project.webcollaborationtool.Query.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Exceptions.InvalidGroupDataException;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Query.Entities.GroupQuery;
import project.webcollaborationtool.Query.Repositories.GroupQueryRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GroupQueryServiceTests
{
    @Mock
    private GroupQueryRepository groupQueryRepository;

    @Mock
    private GroupCollaborationRepository groupCollaborationRepository;

    @InjectMocks
    private GroupQueryService groupQueryService;

    @Test
    public void testCreateQueryWithValidData()
    {
        when(this.groupCollaborationRepository.findById(any())).thenReturn(Optional.of(new GroupCollaboration()));
        when(this.groupQueryRepository.save(any())).thenReturn(new GroupQuery());

        assertThatCode(() -> this.groupQueryService.createQuery(new GroupQuery(), "username", 0)).doesNotThrowAnyException();
    }

    @Test
    public void testCreateQueryWithInvalidData()
    {
        when(this.groupCollaborationRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.groupQueryService.createQuery(new GroupQuery(), "username", 0)).isInstanceOf(InvalidGroupDataException.class);
    }

    @Test
    public void testGetRecentQueriesWithValidData()
    {
        when(this.groupCollaborationRepository.findById(any())).thenReturn(Optional.of(new GroupCollaboration()));
        when(this.groupQueryRepository.findTop10ByGroupCollaborationOrderByCreatedAtDesc(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.groupQueryService.getRecentQueries(0)).doesNotThrowAnyException();
    }

    @Test
    public void testGetRecentQueriesWithInvalidData()
    {
        when(this.groupCollaborationRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.groupQueryService.getRecentQueries(0)).isInstanceOf(InvalidGroupDataException.class);
    }
}
