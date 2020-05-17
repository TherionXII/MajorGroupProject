package project.webcollaborationtool.Collaboration.Thread.Controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Request.Controllers.RequestMessagingControllerTests;
import project.webcollaborationtool.Collaboration.Thread.Entities.Message;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.lang.reflect.Type;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ThreadMessagingControllerTests
{
    @Autowired
    private PrivateCollaborationRepository privateCollaborationRepository;

    @Autowired
    private UserRepository userRepository;

    private CompletableFuture<Message> completableFuture;
    private StompSession stompSession;

    private User firstCollaborator;
    private User secondCollaborator;

    private PrivateCollaboration collaboration;

    @BeforeEach
    public void setUp() throws ExecutionException, InterruptedException
    {
        this.completableFuture = new CompletableFuture<>();
        this.prepareSession();

        this.firstCollaborator = this.createMockUser("user1");
        this.secondCollaborator = this.createMockUser("user2");
        this.createMockCollaboration();
    }

    @Test
    public void testAddMessage() throws InterruptedException, ExecutionException, TimeoutException
    {
        var subscriptionURL = "/topic/user/collaboration/chat/" + this.collaboration.getThread().getId();
        var sendURL = "/app/user/collaboration/chat/" + this.collaboration.getThread().getId();
        this.stompSession.subscribe(subscriptionURL, new ThreadMessagingControllerTests.DefaultFrameHandler());
        this.stompSession.send(sendURL, this.createMockMessage());

        var question = completableFuture.get(5, TimeUnit.SECONDS);

        assertThat(question).isNotNull();
    }

    private void prepareSession() throws ExecutionException, InterruptedException
    {
        var stompClient = new WebSocketStompClient(new StandardWebSocketClient());
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        this.stompSession = stompClient.connect("ws://localhost:8080/ws", new StompSessionHandlerAdapter() {}).completable().get();
    }

    private class DefaultFrameHandler implements StompFrameHandler
    {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders)
        {
            return Message.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o)
        {
            ThreadMessagingControllerTests.this.completableFuture.complete((Message) o);
        }
    }

    private Message createMockMessage()
    {
        var message = new Message();
        message.setSender(this.firstCollaborator.getUsername());
        message.setMessage("message");

        return message;
    }

    private User createMockUser(String username)
    {
        var user = new User();
        user.setUsername(username);
        user.setPassword("password");

        return this.userRepository.save(user);
    }

    private void createMockCollaboration()
    {
        var collaboration = new PrivateCollaboration();
        collaboration.setFirstCollaborator(this.firstCollaborator.getUsername());
        collaboration.setSecondCollaborator(this.secondCollaborator.getUsername());
        collaboration.setUser(this.firstCollaborator);
        collaboration.setThread(new PrivateCollaborationThread());
        this.collaboration = this.privateCollaborationRepository.save(collaboration);

        var collaborationInverse = new PrivateCollaboration();
        collaborationInverse.setFirstCollaborator(this.secondCollaborator.getUsername());
        collaborationInverse.setSecondCollaborator(this.firstCollaborator.getUsername());
        collaborationInverse.setUser(this.secondCollaborator);
        this.privateCollaborationRepository.save(collaborationInverse);
    }
}
