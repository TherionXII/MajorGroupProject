package project.webcollaborationtool.Collaboration.Thread.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.Message;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
import project.webcollaborationtool.Collaboration.Thread.Exceptions.InvalidThreadDataException;
import project.webcollaborationtool.Collaboration.Thread.Repositories.ChatThreadRepository;
import project.webcollaborationtool.Collaboration.Thread.Repositories.MessageRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ThreadServiceTests
{
    @Mock
    private PrivateCollaborationRepository privateCollaborationRepository;

    @Mock
    private ChatThreadRepository chatThreadRepository;

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private ThreadService threadService;

    @Test
    public void testCreatePrivateThread()
    {
        var collaboration = this.createMockCollaboration();

        when(this.privateCollaborationRepository.findByFirstCollaboratorAndSecondCollaborator(any(), any())).thenReturn(collaboration);
        when(this.privateCollaborationRepository.save(any())).thenReturn(collaboration);

        assertThatCode(() -> this.threadService.createPrivateThread("user1", "user2")).doesNotThrowAnyException();
    }

    @Test
    public void testGetMessagesForThreadWithValidThread()
    {
        var collaboration = this.createMockCollaboration();

        when(this.chatThreadRepository.findById(any())).thenReturn(Optional.of(collaboration.getThread()));

        assertThatCode(() -> this.threadService.getMessagesForThread(0)).doesNotThrowAnyException();
    }

    @Test
    public void testGetMessagesForThreadWithInvalidThread()
    {
        when(this.chatThreadRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.threadService.getMessagesForThread(0)).isInstanceOf(InvalidThreadDataException.class);
    }

    @Test
    public void testAddMessageWithValidThread()
    {
        var collaboration = this.createMockCollaboration();

        when(this.chatThreadRepository.findById(any())).thenReturn(Optional.of(collaboration.getThread()));
        when(this.chatThreadRepository.save(any())).thenReturn(collaboration.getThread());

        assertThatCode(() -> this.threadService.addMessage(new Message(), 0)).doesNotThrowAnyException();
    }

    @Test
    public void testAddMessageWithInvalidThread()
    {
        when(this.chatThreadRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.threadService.addMessage(new Message(), 0)).isInstanceOf(InvalidThreadDataException.class);
    }

    public PrivateCollaboration createMockCollaboration()
    {
        var collaboration = new PrivateCollaboration();
        var thread = new PrivateCollaborationThread();
        thread.setId(0);
        thread.setMessages(new ArrayList<>());

        collaboration.setThread(thread);

        return collaboration;
    }
}
