package project.webcollaborationtool.Collaboration.Paper.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Services.PaperService;
import project.webcollaborationtool.Collaboration.Paper.Services.PaperTextExtractionService;

import java.io.IOException;

@RestController
@RequestMapping("/api/papers")
@CrossOrigin(origins = "http://localhost:4200")
public class PaperController
{
    @Autowired
    private PaperService paperService;

    @Autowired
    private PaperTextExtractionService paperTextExtractionService;

    @PostMapping("/{groupId}/createPaper")
    @CrossOrigin(origins = "/group/*/*", methods = RequestMethod.POST)
    public ResponseEntity<?> createPaper(@RequestBody Paper paper, @PathVariable Integer groupId)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperService.createPaper(paper, groupId));
        }
        catch(Exception exception)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @GetMapping("/{groupId}/getPapers")
    @CrossOrigin(origins = "group/*/*", methods = RequestMethod.GET)
    public ResponseEntity<?> getPapersForGroup(@PathVariable Integer groupId)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperService.getPapersForGroup(groupId));
        }
        catch(Exception exception)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @GetMapping("/{paperId}/getPaper")
    @CrossOrigin(origins = "paper/*", methods = RequestMethod.GET)
    public ResponseEntity<?> getPaper(@PathVariable Integer paperId)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperService.getPaper(paperId));
        }
        catch(Exception exception)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @PostMapping("/{paperId}/uploadPaper")
    @CrossOrigin(origins = "/group/*/*", methods = RequestMethod.POST)
    public ResponseEntity<?> convertUploadPDFPagesToImages(@RequestParam("file") MultipartFile file, @PathVariable Integer paperId)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperService.convertPagesToImages(file, paperId));
        }
        catch(IOException exception)
        {
            return ResponseEntity.ok().body(exception.getMessage());
        }
    }

    @PostMapping("/{paperId}/{pageNumber}/extractText")
    @CrossOrigin(origins = "/group/*/*", methods = RequestMethod.POST)
    public ResponseEntity<?> extractTextFromPDF(@PathVariable Integer paperId, @PathVariable Integer pageNumber, @RequestBody PaperQuestion question)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperTextExtractionService.extractQuestion(question, paperId, pageNumber));
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @SendTo("/topic/papers/updateAnswer/{paperId}")
    @MessageMapping("/papers/updateAnswer/{paperId}")
    public PaperQuestion updateAnswer(PaperQuestion updatedQuestion)
    {
        return this.paperService.updateQuestion(updatedQuestion);
    }
}
