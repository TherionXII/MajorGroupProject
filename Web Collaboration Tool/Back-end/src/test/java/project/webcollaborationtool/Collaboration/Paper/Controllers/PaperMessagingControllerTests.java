package project.webcollaborationtool.Collaboration.Paper.Controllers;

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
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Entities.Position;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperQuestionRepository;

import java.lang.reflect.Type;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class PaperMessagingControllerTests
{
    @Autowired
    private PaperQuestionRepository paperQuestionRepository;

    private CompletableFuture<PaperQuestion> completableFuture;
    private StompSession stompSession;

    private PaperQuestion question;

    @BeforeEach
    public void setUp() throws ExecutionException, InterruptedException
    {
        this.completableFuture = new CompletableFuture<>();
        this.prepareSession();

        this.question = this.paperQuestionRepository.save(this.createMockQuestion());
    }

    @Test
    public void testUpdateQuestion() throws InterruptedException, ExecutionException, TimeoutException
    {
        this.stompSession.subscribe("/topic/papers/updateAnswer/0", new PaperMessagingControllerTests.DefaultFrameHandler());
        this.stompSession.send("/app/papers/updateAnswer/0", question);

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
            return PaperQuestion.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o)
        {
            PaperMessagingControllerTests.this.completableFuture.complete((PaperQuestion) o);
        }
    }

    private PaperQuestion createMockQuestion()
    {
        var question = new PaperQuestion();
        question.setQuestionPosition(this.getPosition());
        question.setText("text");

        return question;
    }

    private Position getPosition()
    {
        var position = new Position();
        position.setX1(0);
        position.setX2(10);
        position.setY1(0);
        position.setY2(10);

        return position;
    }
}
