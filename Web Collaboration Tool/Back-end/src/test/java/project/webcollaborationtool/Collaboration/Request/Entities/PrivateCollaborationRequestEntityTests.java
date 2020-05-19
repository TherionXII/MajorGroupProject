package project.webcollaborationtool.Collaboration.Request.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PrivateCollaborationRequestEntityTests
{
    @Test
    public void testPrivateCollaborationRequestConstructor()
    {
        var request = new PrivateCollaborationRequest();
        assertThat(request).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var request = new PrivateCollaborationRequest();

        request.setId(0);
        assertThat(request.getId()).isEqualTo(0);

        request.setSender("username1");
        assertThat(request.getSender()).isEqualTo("username1");

        request.setRecipient("username2");
        assertThat(request.getRecipient()).isEqualTo("username2");

        request.setIsAccepted(true);
        assertThat(request.getIsAccepted()).isTrue();
    }

    @Test
    public void testToString()
    {
        var request = new PrivateCollaborationRequest();
        assertThat(request.toString().contains("PrivateCollaborationRequest")).isTrue();
    }
}
