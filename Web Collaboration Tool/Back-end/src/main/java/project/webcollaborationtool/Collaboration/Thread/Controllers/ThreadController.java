package project.webcollaborationtool.Collaboration.Thread.Controllers;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.Thread.Entities.Message;
import project.webcollaborationtool.Collaboration.Thread.Services.ThreadService;

import java.util.Collection;

@RestController
public class ThreadController
{
    @Autowired
    private ThreadService threadService;

    @GetMapping("/createPrivateThread/{collaboratorOne}/{collaboratorTwo}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Integer> createPrivateThread(@PathVariable String collaboratorOne, @PathVariable String collaboratorTwo)
    {
        return ResponseEntity.ok().body(this.threadService.createPrivateThread(collaboratorOne, collaboratorTwo));
    }

    @GetMapping("/getMessagesForThread/{threadId}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Collection<Message>> getMessagesForThread(@PathVariable Integer threadId)
    {
        return ResponseEntity.ok().body(this.threadService.getMessagesForThread(threadId));
    }

    @MessageMapping("/user/collaboration/chat/{threadId}")
    @SendTo("/topic/user/collaboration/chat/{threadId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public Message sendMessage(Message message, @DestinationVariable("threadId") Integer threadId)
    {
        this.threadService.addMessage(message, threadId);
        return message;
    }
}
