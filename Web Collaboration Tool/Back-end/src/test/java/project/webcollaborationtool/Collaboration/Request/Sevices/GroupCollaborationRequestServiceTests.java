package project.webcollaborationtool.Collaboration.Request.Sevices;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Repositories.GroupCollaborationRequestRepository;
import project.webcollaborationtool.Collaboration.Request.Services.GroupCollaborationRequestService;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GroupCollaborationRequestServiceTests
{
    @Mock
    private GroupCollaborationRequestRepository groupCollaborationRequestRepository;

    @InjectMocks
    private GroupCollaborationRequestService groupCollaborationRequestService;

    @Test
    public void testCreateRequest()
    {
        when(this.groupCollaborationRequestRepository.save(any())).thenReturn(new GroupCollaborationRequest());

        assertThatCode(() -> this.groupCollaborationRequestService.createGroupCollaborationRequest(new GroupCollaborationRequest())).doesNotThrowAnyException();
    }

    @Test
    public void testGetGroupInvitationsForUser()
    {
        when(this.groupCollaborationRequestRepository.findAllByRecipient(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.groupCollaborationRequestService.getGroupInvitationsForUser("user")).doesNotThrowAnyException();
    }

    @Test
    public void testDeleteRequest()
    {
        doNothing().when(this.groupCollaborationRequestRepository).deleteById(any());

        assertThatCode(() -> this.groupCollaborationRequestService.deleteRequest(new GroupCollaborationRequest())).doesNotThrowAnyException();
    }

    @Test
    public void testGetGroupInvitationsForGroup()
    {
        when(this.groupCollaborationRequestRepository.findAllByGroupId(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.groupCollaborationRequestService.getGroupInvitationsForGroup(0)).doesNotThrowAnyException();
    }
}
