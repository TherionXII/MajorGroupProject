package project.webcollaborationtool.Query.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Query.Repositories.QueryRepository;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
class QueryEntityTests
{
    @Test
    public void testQueryConstructors()
    {
        var query = new Query();
        assertThat(query).isNotEqualTo(null);
    }

    @Test
    public void testQueryModelSettersAndGetters()
    {
        var query = new Query();

        query.setId(1);
        assertThat(query.getId()).isEqualTo(1);

        query.setTitle("Title");
        assertThat(query.getTitle()).isEqualTo("Title");

        query.setSubtitle("SubTitle");
        assertThat(query.getSubtitle()).isEqualTo("SubTitle");

        query.setContents("Contents");
        assertThat(query.getContents()).isEqualTo("Contents");

        var timestamp = Timestamp.valueOf(LocalDateTime.now());
        query.setCreatedAt(timestamp);
        assertThat(query.getCreatedAt()).isEqualTo(timestamp);

        query.setUpdatedAt(timestamp);
        assertThat(query.getUpdatedAt()).isEqualTo(timestamp);
    }

    @Test
    public void testToString()
    {
        var query = new Query();
        assertThat(query.toString().contains("Query")).isTrue();
    }
}