package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class GroupCollaborationEntityTests
{
    @Test
    public void testGroupCollaborationEntityConstructor()
    {
        var groupCollaboration = new GroupCollaboration();
        assertThat(groupCollaboration).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var groupCollaboration = new GroupCollaboration();

        groupCollaboration.setId(0);
        assertThat(groupCollaboration.getId()).isEqualTo(0);

        groupCollaboration.setGroupMembers(new ArrayList<>());
        assertThat(groupCollaboration.getGroupMembers()).isNotNull();
        assertThat(groupCollaboration.getGroupMembers().size()).isEqualTo(0);

        groupCollaboration.setExamPapers(new ArrayList<>());
        assertThat(groupCollaboration.getExamPapers()).isNotNull();
        assertThat(groupCollaboration.getExamPapers().size()).isEqualTo(0);

        groupCollaboration.setTitle("title");
        assertThat(groupCollaboration.getTitle()).isEqualTo("title");

        groupCollaboration.setDescription("description");
        assertThat(groupCollaboration.getDescription()).isEqualTo("description");

        groupCollaboration.setThread(new GroupCollaborationThread());
        assertThat(groupCollaboration.getThread()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var groupCollaboration = new GroupCollaboration();

        assertThat(groupCollaboration.toString().contains("GroupCollaboration")).isTrue();
    }
}
