package project.webcollaborationtool.Collaboration.PDFProcessing.Controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.PDFProcessing.Services.PaperTextExtractionService;

@RestController
@Component
public class PaperTextExtractionController
{
    @Autowired
    private PaperTextExtractionService paperTextExtractionService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/pdf/textExtraction/{paperId}/{pageNumber}")
    public ResponseEntity<String> extractTextFromPDF(@PathVariable Integer paperId, @PathVariable Integer pageNumber,
                                                     @RequestParam("position") JSONObject position)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperTextExtractionService.extractQuestion(position, paperId, pageNumber));
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
