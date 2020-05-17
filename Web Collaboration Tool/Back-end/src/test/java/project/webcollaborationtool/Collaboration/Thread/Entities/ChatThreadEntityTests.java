package project.webcollaborationtool.Collaboration.Thread.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class ChatThreadEntityTests
{
    @Test
    public void testChatThreadEntityConstructor()
    {
        var chat = new ChatThread();
        assertThat(chat).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var chat = new ChatThread();

        chat.setId(0);
        assertThat(chat.getId()).isEqualTo(0);

        chat.setMessages(new ArrayList<>());
        assertThat(chat.getMessages()).isNotNull();

        chat.setLastMessage(new Message());
        assertThat(chat.getLastMessage()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var chat = new ChatThread();
        assertThat(chat.toString().contains("ChatThread")).isTrue();
    }
}
