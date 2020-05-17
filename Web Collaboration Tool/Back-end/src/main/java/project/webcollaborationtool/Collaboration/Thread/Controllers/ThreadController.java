package project.webcollaborationtool.Collaboration.Thread.Controllers;

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
@RequestMapping("/api/chatThreads")
@CrossOrigin(origins = "http://localhost:4200")
public class ThreadController
{
    @Autowired
    private ThreadService threadService;

    @GetMapping("/{collaboratorOne}/{collaboratorTwo}/createPrivateThread")
    @CrossOrigin(origins = "/collaborations", methods = RequestMethod.GET)
    public ResponseEntity<Integer> createPrivateThread(@PathVariable String collaboratorOne, @PathVariable String collaboratorTwo)
    {
        return ResponseEntity.ok().body(this.threadService.createPrivateThread(collaboratorOne, collaboratorTwo));
    }

    @GetMapping("/{threadId}/getMessagesForThread")
    @CrossOrigin(origins = { "/thread/*", "/group/*/*" }, methods = RequestMethod.GET)
    public ResponseEntity<Collection<Message>> getMessagesForThread(@PathVariable Integer threadId)
    {
        return ResponseEntity.ok().body(this.threadService.getMessagesForThread(threadId));
    }
}
