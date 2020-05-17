package project.webcollaborationtool.Collaboration.Thread.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class GroupCollaborationThreadEntityTests
{
    @Test
    public void testGroupCollaborationThreadConstructor()
    {
        var chat = new GroupCollaborationThread();
        assertThat(chat).isNotNull();
    }

    @Test
    public void testSettersAndGetters()
    {
        var chat = new GroupCollaborationThread();

        chat.setGroupCollaboration(new GroupCollaboration());
        assertThat(chat.getGroupCollaboration()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var chat = new GroupCollaborationThread();
        assertThat(chat.toString().contains("GroupCollaborationThread")).isTrue();
    }
}
