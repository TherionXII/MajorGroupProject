package project.webcollaborationtool.Collaboration.GroupCollaboration.Controllers;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupMember;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupMemberRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.User.Entities.Profile;
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
public class GroupCollaborationMessagingControllerTests
{
    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @Autowired
    private UserRepository userRepository;

    private CompletableFuture<Notification> completableFuture;
    private StompSession stompSession;

    private User user;
    private GroupCollaboration groupCollaboration;

    @BeforeEach
    public void setUp() throws ExecutionException, InterruptedException
    {
        this.completableFuture = new CompletableFuture<>();
        this.prepareSession();

        this.user = this.userRepository.save(this.createMockUser());
        this.groupCollaboration = this.groupCollaborationRepository.save(this.createSavedMockGroup());
        this.groupMemberRepository.save(this.createSavedGroupMember());
    }

    @Test
    public void testMakeAdmin() throws InterruptedException, ExecutionException, TimeoutException
    {
        this.stompSession.subscribe("/topic/user/notification/" + this.user.getUsername(), new DefaultFrameHandler());
        this.stompSession.send("/app/user/collaboration/makeAdmin/" + this.groupCollaboration.getId() + "/" + this.user.getUsername(), new Notification());

        var notification = completableFuture.get(5, TimeUnit.SECONDS);

        assertThat(notification).isNotNull();
    }

    @Test
    public void testRemoveFromGroup() throws InterruptedException, ExecutionException, TimeoutException
    {
        this.stompSession.subscribe("/topic/user/notification/" + this.user.getUsername(), new DefaultFrameHandler());
        this.stompSession.send("/app/user/collaboration/removeFromGroup/" + this.groupCollaboration.getId() + "/" + this.user.getUsername(), new Notification());

        var notification = completableFuture.get(5, TimeUnit.SECONDS);

        assertThat(notification).isNotNull();
    }

    private void prepareSession() throws ExecutionException, InterruptedException
    {
        var stompClient = new WebSocketStompClient(new StandardWebSocketClient());
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        this.stompSession = stompClient.connect("ws://localhost:8080/ws", new StompSessionHandlerAdapter() {}).completable().get();
    }

    private User createMockUser()
    {
        var user = new User();
        user.setUsername("username");
        user.setPassword("password");
        user.setGroups(new ArrayList<>());

        var profile = new Profile();
        profile.setUsername(user.getUsername());
        user.setProfile(profile);

        return user;
    }


    private GroupCollaboration createSavedMockGroup()
    {
        var group = new GroupCollaboration();
        group.setTitle("Title");
        group.setDescription("Description");
        group.setExamPapers(new ArrayList<>());
        group.setGroupMembers(new ArrayList<>());
        group.setThread(new GroupCollaborationThread());

        return group;
    }

    private GroupMember createSavedGroupMember()
    {
        var groupMember = new GroupMember();
        groupMember.setGroupId(this.groupCollaboration.getId());
        groupMember.setMemberUsername(this.user.getUsername());
        groupMember.setIsAdmin(false);

        return groupMember;
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
            GroupCollaborationMessagingControllerTests.this.completableFuture.complete((Notification) o);
        }
    }
}
