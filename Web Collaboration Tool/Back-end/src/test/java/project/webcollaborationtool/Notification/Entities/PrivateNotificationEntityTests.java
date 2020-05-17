package project.webcollaborationtool.Notification.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Notifications.Entities.PrivateNotification;
import project.webcollaborationtool.User.Entities.User;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PrivateNotificationEntityTests
{
    @Test
    public void testPrivateNotificationConstructor()
    {
        var privateNotification = new PrivateNotification();
        assertThat(privateNotification).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var privateNotification = new PrivateNotification();

        privateNotification.setRecipient(new User());
        assertThat(privateNotification.getRecipient()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var privateNotification = new PrivateNotification();
        assertThat(privateNotification.toString().contains("PrivateNotification")).isTrue();
    }
}
