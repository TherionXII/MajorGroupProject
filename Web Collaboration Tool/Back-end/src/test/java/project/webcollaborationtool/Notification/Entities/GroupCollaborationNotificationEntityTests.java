package project.webcollaborationtool.Notification.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Notifications.Entities.GroupCollaborationNotification;
import project.webcollaborationtool.User.Entities.User;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class GroupCollaborationNotificationEntityTests
{
    @Test
    public void testGroupCollaborationNotificationConstructor()
    {
        var groupCollaborationNotification = new GroupCollaborationNotification();
        assertThat(groupCollaborationNotification).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var groupCollaborationNotification = new GroupCollaborationNotification();

        groupCollaborationNotification.setGroupId(0);
        assertThat(groupCollaborationNotification.getGroupId()).isEqualTo(0);

        groupCollaborationNotification.setRecipient(new User());
        assertThat(groupCollaborationNotification.getRecipient()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var groupCollaborationNotification = new GroupCollaborationNotification();
        assertThat(groupCollaborationNotification.toString().contains("GroupCollaborationNotification")).isTrue();
    }
}
