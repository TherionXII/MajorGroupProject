package project.webcollaborationtool.Query.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class GroupQueryEntityTests
{
    @Test
    public void testGroupQueryConstructor()
    {
        var query = new GroupQuery();
        assertThat(query).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var query = new GroupQuery();

        query.setGroupCollaboration(new GroupCollaboration());
        assertThat(query.getGroupCollaboration()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var query = new GroupQuery();
        assertThat(query.toString().contains("GroupQuery")).isTrue();
    }
}
