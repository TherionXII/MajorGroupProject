package project.webcollaborationtool.Collaboration.Request.Sevices;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Repositories.PrivateCollaborationRequestRepository;
import project.webcollaborationtool.Collaboration.Request.Services.PrivateCollaborationRequestService;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PrivateCollaborationRequestServiceTests
{
    @Mock
    private PrivateCollaborationRequestRepository privateCollaborationRequestRepository;

    @InjectMocks
    private PrivateCollaborationRequestService privateCollaborationRequestService;

    @Test
    public void testGetRequestsForUser()
    {
        when(this.privateCollaborationRequestRepository.findAllByRecipient(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.privateCollaborationRequestService.getRequestsForUser("username")).doesNotThrowAnyException();
    }

    @Test
    public void testCreatePrivateCollaborationRequest()
    {
        when(this.privateCollaborationRequestRepository.save(any())).thenReturn(new PrivateCollaborationRequest());

        assertThatCode(() ->
                this.privateCollaborationRequestService.createPrivateCollaborationRequest(new PrivateCollaborationRequest())).doesNotThrowAnyException();
    }

    @Test
    public void testDeleteCollaborationRequest()
    {
        doNothing().when(this.privateCollaborationRequestRepository).deleteBySenderAndRecipient(any(), any());

        assertThatCode(() -> this.privateCollaborationRequestService.deleteCollaborationRequest(new PrivateCollaborationRequest())).doesNotThrowAnyException();
    }

    @Test
    public void testExistsBySenderAndRecipient()
    {
        when(this.privateCollaborationRequestRepository.existsBySenderAndRecipient(any(), any())).thenReturn(true);

        assertThatCode(() -> this.privateCollaborationRequestService.existsBySenderAndRecipient("user1", "user2")).doesNotThrowAnyException();
    }
}
