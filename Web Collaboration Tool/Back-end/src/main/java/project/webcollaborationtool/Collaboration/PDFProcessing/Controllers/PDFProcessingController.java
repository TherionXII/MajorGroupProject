package project.webcollaborationtool.Collaboration.PDFProcessing.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.PDFProcessing.Services.PDFConversionService;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
public class PDFProcessingController
{
    @Autowired
    private PDFConversionService pdfConversionService;

    @PostMapping(value = "/pdf/fileUpload")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.POST)
    public ResponseEntity<?> convertUploadPDFPagesToImages(@RequestParam("file") MultipartFile file)
    {
        try
        {
            return ResponseEntity.ok().body(this.pdfConversionService.convertPagesToImages(file));
        }
        catch (IOException | ExecutionException | InterruptedException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
