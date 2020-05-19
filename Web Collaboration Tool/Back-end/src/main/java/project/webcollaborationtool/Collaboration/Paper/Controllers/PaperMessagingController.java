package project.webcollaborationtool.Collaboration.Paper.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Services.PaperService;

@RestController
public class PaperMessagingController
{
    @Autowired
    private PaperService paperService;

    @SendTo("/topic/papers/updateAnswer/{paperId}")
    @MessageMapping("/papers/updateAnswer/{paperId}")
    public PaperQuestion updateAnswer(PaperQuestion updatedQuestion)
    {
        return this.paperService.updateQuestion(updatedQuestion);
    }
}
