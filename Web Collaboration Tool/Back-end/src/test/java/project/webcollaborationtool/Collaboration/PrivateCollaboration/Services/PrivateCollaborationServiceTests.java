package project.webcollaborationtool.Collaboration.PrivateCollaboration.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PrivateCollaborationServiceTests
{
    @Mock
    private PrivateCollaborationRepository privateCollaborationRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PrivateCollaborationService privateCollaborationService;

    @Test
    public void testCreatePrivateCollaboration()
    {
        var request = this.createMockRequest();

        when(this.userRepository.findByUsername(request.getSender())).thenReturn(new User());
        when(this.userRepository.findByUsername(request.getRecipient())).thenReturn(new User());
        when(this.privateCollaborationRepository.save(any())).thenReturn(new PrivateCollaboration());

        assertThatCode(() -> this.privateCollaborationService.createPrivateCollaboration(request)).doesNotThrowAnyException();
    }

    @Test
    public void testIsCollaborating()
    {
        when(this.privateCollaborationRepository.existsById(any())).thenReturn(true);

        assertThatCode(() -> this.privateCollaborationService.isCollaborating("user1", "user2")).doesNotThrowAnyException();
    }

    @Test
    public void testGetAllPrivateCollaborationsForUser()
    {
        when(this.privateCollaborationRepository.findAllByFirstCollaborator(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.privateCollaborationService.getAllPrivateCollaborationsForUser("user")).doesNotThrowAnyException();
    }

    private PrivateCollaborationRequest createMockRequest()
    {
        var request = new PrivateCollaborationRequest();
        request.setSender("user1");
        request.setRecipient("user2");

        return request;
    }
}
