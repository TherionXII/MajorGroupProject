package project.webcollaborationtool.Collaboration.PrivateCollaboration.Controllers;

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
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Repositories.NotificationRepository;
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
public class PrivateCollaborationMessagingControllerTests
{
    @Autowired
    private UserRepository userRepository;

    private CompletableFuture<Notification> completableFuture;
    private StompSession stompSession;

    @BeforeEach
    public void setUp() throws ExecutionException, InterruptedException
    {
        this.completableFuture = new CompletableFuture<>();
        this.prepareSession();

        this.createUsers();
    }

    @Test
    public void testRespondToCollaborationRequest() throws InterruptedException, ExecutionException, TimeoutException
    {
        var request = this.createMockRequest();

        this.stompSession.subscribe("/topic/user/notification/" + request.getRecipient(), new PrivateCollaborationMessagingControllerTests.DefaultFrameHandler());
        this.stompSession.send("/app/user/collaboration/response/" + request.getRecipient(), request);

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
            return Notification.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o)
        {
            PrivateCollaborationMessagingControllerTests.this.completableFuture.complete((Notification) o);
        }
    }

    private PrivateCollaborationRequest createMockRequest()
    {
        var request = new PrivateCollaborationRequest();
        request.setSender("user1");
        request.setRecipient("user2");
        request.setIsAccepted(true);

        return request;
    }

    private void createUsers()
    {
        var firstUser = new User();
        firstUser.setUsername("user1");
        firstUser.setPassword("user2");

        this.userRepository.save(firstUser);

        var secondUser = new User();
        secondUser.setUsername("user2");
        secondUser.setPassword("password");

        this.userRepository.save(secondUser);
    }
}
