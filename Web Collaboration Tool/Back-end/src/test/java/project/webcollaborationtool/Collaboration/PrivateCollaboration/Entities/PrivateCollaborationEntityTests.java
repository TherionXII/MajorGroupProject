package project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
import project.webcollaborationtool.User.Entities.User;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PrivateCollaborationEntityTests
{
    @Test
    public void testPrivateCollaborationConstructor()
    {
        var privateCollaboration = new PrivateCollaboration();
        assertThat(privateCollaboration).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var privateCollaboration = new PrivateCollaboration();

        privateCollaboration.setFirstCollaborator("username1");
        assertThat(privateCollaboration.getFirstCollaborator()).isEqualTo("username1");

        privateCollaboration.setSecondCollaborator("username2");
        assertThat(privateCollaboration.getSecondCollaborator()).isEqualTo("username2");

        privateCollaboration.setUser(new User());
        assertThat(privateCollaboration.getUser()).isNotNull();

        privateCollaboration.setThread(new PrivateCollaborationThread());
        assertThat(privateCollaboration.getThread()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var privateCollaboration = new PrivateCollaboration();
        assertThat(privateCollaboration.toString().contains("PrivateCollaboration")).isTrue();
    }
}
