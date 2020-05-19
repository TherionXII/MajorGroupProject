package project.webcollaborationtool.Notification.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Notifications.Entities.PrivateCollaborationNotification;
import project.webcollaborationtool.User.Entities.User;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PrivateCollaborationNotificationEntityTests
{
    @Test
    public void testPrivateCollaborationNotificationConstructor()
    {
        var privateCollaborationNotification = new PrivateCollaborationNotification();
        assertThat(privateCollaborationNotification).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var privateCollaborationNotification = new PrivateCollaborationNotification();

        privateCollaborationNotification.setSender("user");
        assertThat(privateCollaborationNotification.getSender()).isEqualTo("user");

        privateCollaborationNotification.setRecipient(new User());
        assertThat(privateCollaborationNotification.getRecipient()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var privateCollaborationNotification = new PrivateCollaborationNotification();
        assertThat(privateCollaborationNotification.toString().contains("PrivateCollaborationNotification")).isTrue();
    }
}
