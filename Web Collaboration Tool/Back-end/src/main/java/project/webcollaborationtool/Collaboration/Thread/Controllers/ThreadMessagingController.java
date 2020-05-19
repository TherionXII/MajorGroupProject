package project.webcollaborationtool.Collaboration.Thread.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import project.webcollaborationtool.Collaboration.Thread.Entities.Message;
import project.webcollaborationtool.Collaboration.Thread.Services.ThreadService;

@RestController
public class ThreadMessagingController
{
    @Autowired
    private ThreadService threadService;

    @SendTo("/topic/user/collaboration/chat/{threadId}")
    @MessageMapping("/user/collaboration/chat/{threadId}")
    public Message sendMessage(Message message, @DestinationVariable("threadId") Integer threadId)
    {
        this.threadService.addMessage(message, threadId);
        return message;
    }
}
