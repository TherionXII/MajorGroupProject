package project.webcollaborationtool.Query.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class ResponseEntityTests
{
    @Test
    public void testResponseConstructor()
    {
        var response = new Response();
        assertThat(response).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var response = new Response();

        response.setRating(0);
        assertThat(response.getRating()).isEqualTo(0);

        response.setParent(new Query());
        assertThat(response.getParent()).isNotNull();

        response.setVotes(new ArrayList<>());
        assertThat(response.getVotes()).isNotNull();

        response.setUsername("username");
        assertThat(response.getUsername()).isEqualTo("username");

        var timestamp = Timestamp.valueOf(LocalDateTime.now());
        response.setCreatedAt(timestamp);
        assertThat(response.getCreatedAt()).isEqualTo(timestamp);

        response.setId(0);
        assertThat(response.getId()).isEqualTo(0);

        response.setResponse("response");
        assertThat(response.getResponse()).isEqualTo("response");
    }

    @Test
    public void testToString()
    {
        var response = new Response();
        assertThat(response.toString().contains("Response")).isTrue();
    }
}
