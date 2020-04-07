package project.webcollaborationtool.Collaboration.PDFProcessing.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.PDFProcessing.Services.PaperConversionService;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
public class PaperUploadController
{
    @Autowired
    private PaperConversionService paperConversionService;

    @PostMapping(value = "/pdf/fileUpload/{groupId}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.POST)
    public ResponseEntity<?> convertUploadPDFPagesToImages(@RequestParam("file") MultipartFile file, @PathVariable Integer groupId)
    {
        try
        {
            return ResponseEntity.ok().body(this.paperConversionService.convertPagesToImages(file, groupId));
        }
        catch (IOException | ExecutionException | InterruptedException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
