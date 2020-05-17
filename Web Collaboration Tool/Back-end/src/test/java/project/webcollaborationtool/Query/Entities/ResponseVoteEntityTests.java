package project.webcollaborationtool.Query.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ExtendWith(SpringExtension.class)
class ResponseVoteEntityTests
{
    @Test
    public void testResponseVoteConstructor()
    {
        var vote = new ResponseVote();
        assertThat(vote).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var vote = new ResponseVote();

        vote.setResponse(new Response());
        assertThat(vote.getResponse()).isNotNull();

        vote.setResponseId(0);
        assertThat(vote.getResponseId()).isEqualTo(0);

        vote.setUsername("username");
        assertThat(vote.getUsername()).isEqualTo("username");

        vote.setVote(true);
        assertThat(vote.getVote()).isTrue();
    }

    @Test
    public void testToString()
    {
        var vote = new ResponseVote();
        assertThat(vote.toString().contains("ResponseVote")).isTrue();
    }
}