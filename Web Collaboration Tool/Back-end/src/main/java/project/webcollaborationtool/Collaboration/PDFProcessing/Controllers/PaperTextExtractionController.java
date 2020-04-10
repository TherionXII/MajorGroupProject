package project.webcollaborationtool.Collaboration.PDFProcessing.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.PDFProcessing.Services.PaperTextExtractionService;

@RestController
@Component
public class PaperTextExtractionController
{
    @Autowired
    private PaperTextExtractionService paperTextExtractionService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/pdf/textExtraction/{paperId}/{pageNumber}")
    public ResponseEntity<?> extractTextFromPDF(@PathVariable Integer paperId, @PathVariable Integer pageNumber, @RequestBody PaperQuestion question)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperTextExtractionService.extractQuestion(question, paperId, pageNumber));
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
