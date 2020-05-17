package project.webcollaborationtool.Collaboration.Thread.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class MessageEntityTests
{
    @Test
    public void testMessageConstructor()
    {
        var message = new Message();
        assertThat(message).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var message = new Message();

        message.setId(0);
        assertThat(message.getId()).isEqualTo(0);

        message.setMessage("message");
        assertThat(message.getMessage()).isEqualTo("message");

        var timestamp = Timestamp.valueOf(LocalDateTime.now());
        message.setCreatedAt(timestamp);
        assertThat(message.getCreatedAt()).isEqualTo(timestamp);

        message.setSender("sender");
        assertThat(message.getSender()).isEqualTo("sender");

        message.setThread(new ChatThread());
        assertThat(message.getThread()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var message = new Message();
        assertThat(message.toString().contains("Message")).isTrue();
    }
}
