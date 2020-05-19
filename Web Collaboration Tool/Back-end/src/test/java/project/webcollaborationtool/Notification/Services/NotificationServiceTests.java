package project.webcollaborationtool.Notification.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Repositories.NotificationRepository;
import project.webcollaborationtool.Notifications.Repositories.PrivateNotificationRepository;
import project.webcollaborationtool.Notifications.Services.NotificationService;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class NotificationServiceTests
{
    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private PrivateNotificationRepository privateNotificationRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GroupCollaborationRepository groupCollaborationRepository;

    @InjectMocks
    private NotificationService notificationService;

    @Test
    public void testAddPrivateCollaborationRequestNotification()
    {
        when(this.userRepository.findByUsername(any())).thenReturn(new User());
        when(this.notificationRepository.save(any())).thenReturn(new Notification());

        assertThatCode(() -> this.notificationService.addPrivateCollaborationRequestNotification(new PrivateCollaborationRequest())).doesNotThrowAnyException();
    }

    @Test
    public void testAddPrivateCollaborationRequestResponseNotification()
    {
        var request = new PrivateCollaborationRequest();
        request.setSender("username");
        request.setIsAccepted(true);

        when(this.userRepository.findByUsername(any())).thenReturn(new User());
        when(this.notificationRepository.save(any())).thenReturn(new Notification());

        assertThatCode(()
                -> this.notificationService.addPrivateCollaborationRequestResponseNotification(request)).doesNotThrowAnyException();
    }

    @Test
    public void testGetNotifications()
    {
        when(this.privateNotificationRepository.findAllByRecipientOrderByCreatedAtDesc(any())).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.notificationService.getNotifications("username")).doesNotThrowAnyException();
    }

    @Test
    public void testGetAddGroupCollaborationRequestWithValidGroup()
    {
        when(this.groupCollaborationRepository.findById(any())).thenReturn(Optional.of(new GroupCollaboration()));
        when(this.userRepository.findByUsername(any())).thenReturn(new User());
        when(this.notificationRepository.save(any())).thenReturn(new Notification());

        assertThatCode(() -> this.notificationService.addGroupCollaborationRequest(new GroupCollaborationRequest())).doesNotThrowAnyException();
    }
}
