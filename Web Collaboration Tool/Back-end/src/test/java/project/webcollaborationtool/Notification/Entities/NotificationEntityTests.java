package project.webcollaborationtool.Notification.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Notifications.Entities.Notification;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class NotificationEntityTests
{
    @Test
    public void testNotificationConstructor()
    {
        var notification = new Notification();
        assertThat(notification).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var notification = new Notification();

        notification.setId(0);
        assertThat(notification.getId()).isEqualTo(0);

        notification.setContent("content");
        assertThat(notification.getContent()).isEqualTo("content");

        var timestamp = Timestamp.valueOf(LocalDateTime.now());
        notification.setCreatedAt(timestamp);
        assertThat(notification.getCreatedAt()).isEqualTo(timestamp);

        notification.setTitle("title");
        assertThat(notification.getTitle()).isEqualTo("title");
    }

    @Test
    public void testToString()
    {
        var notification = new Notification();
        assertThat(notification.toString().contains("Notification")).isTrue();
    }
}
