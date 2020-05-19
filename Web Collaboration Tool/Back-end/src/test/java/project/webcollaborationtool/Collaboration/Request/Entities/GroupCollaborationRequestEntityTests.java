package project.webcollaborationtool.Collaboration.Request.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class GroupCollaborationRequestEntityTests
{
    @Test
    public void testGroupCollaborationRequestConstructor()
    {
        var request = new GroupCollaborationRequest();
        assertThat(request).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var request = new GroupCollaborationRequest();

        request.setId(0);
        assertThat(request.getId()).isEqualTo(0);

        request.setGroupId(0);
        assertThat(request.getGroupId()).isEqualTo(0);

        request.setIsAccepted(true);
        assertThat(request.getIsAccepted()).isTrue();

        request.setRecipient("username");
        assertThat(request.getRecipient()).isEqualTo("username");
    }

    @Test
    public void testToString()
    {
        var request = new GroupCollaborationRequest();
        assertThat(request.toString().contains("GroupCollaborationRequest")).isTrue();
    }
}
