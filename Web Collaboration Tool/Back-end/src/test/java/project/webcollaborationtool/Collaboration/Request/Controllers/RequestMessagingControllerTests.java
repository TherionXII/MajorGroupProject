package project.webcollaborationtool.Collaboration.Request.Controllers;

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
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class RequestMessagingControllerTests
{
    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private UserRepository userRepository;

    private CompletableFuture<Notification> completableFuture;
    private StompSession stompSession;

    private GroupCollaboration groupCollaboration;

    @BeforeEach
    public void setUp() throws ExecutionException, InterruptedException
    {
        this.groupCollaboration = this.createMockGroup();
        this.createMockUser();

        this.completableFuture = new CompletableFuture<>();
        this.prepareSession();
    }

    @Test
    public void testCreateGroupCollaborationRequest() throws InterruptedException, ExecutionException, TimeoutException
    {
        var request = this.createMockGroupCollaborationRequest();

        this.stompSession.subscribe("/topic/user/notification/" + request.getRecipient(), new RequestMessagingControllerTests.DefaultFrameHandler());
        this.stompSession.send("/app/user/collaboration/invitation/" + request.getRecipient(), request);

        var question = completableFuture.get(5, TimeUnit.SECONDS);

        assertThat(question).isNotNull();
    }

    @Test
    public void testCreatePrivateCollaborationRequest() throws InterruptedException, ExecutionException, TimeoutException
    {
        var request = this.createMockPrivateCollaborationRequest();

        this.stompSession.subscribe("/topic/user/notification/" + request.getRecipient(), new RequestMessagingControllerTests.DefaultFrameHandler());
        this.stompSession.send("/app/user/collaboration/request/" + request.getRecipient(), request);

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
            RequestMessagingControllerTests.this.completableFuture.complete((Notification) o);
        }
    }

    private GroupCollaboration createMockGroup()
    {
        var groupCollaboration = new GroupCollaboration();
        groupCollaboration.setThread(new GroupCollaborationThread());
        groupCollaboration.setExamPapers(new ArrayList<>());
        groupCollaboration.setGroupMembers(new ArrayList<>());
        groupCollaboration.setDescription("description");
        groupCollaboration.setTitle("title");

        return this.groupCollaborationRepository.save(groupCollaboration);
    }

    private GroupCollaborationRequest createMockGroupCollaborationRequest()
    {
        var request = new GroupCollaborationRequest();
        request.setGroupId(0);
        request.setRecipient("user");
        request.setIsAccepted(false);
        request.setGroupId(this.groupCollaboration.getId());

        return request;
    }

    private void createMockUser()
    {
        var user = new User();
        user.setUsername("user");
        user.setPassword("password");

        this.userRepository.save(user);
    }

    private PrivateCollaborationRequest createMockPrivateCollaborationRequest()
    {
        var request = new PrivateCollaborationRequest();
        request.setSender("user1");
        request.setRecipient("user");
        request.setIsAccepted(true);

        return request;
    }
}
