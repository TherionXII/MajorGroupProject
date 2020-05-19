package project.webcollaborationtool.Collaboration.Thread.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PrivateCollaborationThreadEntityTests
{
    @Test
    public void testPrivateCollaborationThreadConstructor()
    {
        var chat = new PrivateCollaborationThread();
        assertThat(chat).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var chat = new PrivateCollaborationThread();

        chat.setPrivateCollaboration(new ArrayList<>());
        assertThat(chat.getPrivateCollaboration()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var chat = new PrivateCollaborationThread();
        assertThat(chat.toString().contains("PrivateCollaborationThread")).isTrue();
    }
}
