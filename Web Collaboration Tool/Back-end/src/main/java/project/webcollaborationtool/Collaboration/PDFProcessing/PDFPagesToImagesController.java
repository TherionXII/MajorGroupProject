package project.webcollaborationtool.Collaboration.PDFProcessing;

import org.apache.commons.io.FileUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
public class PDFPagesToImagesController
{
    @ResponseBody
    @PostMapping("/pdf/fileUpload")
    @CrossOrigin
    public ResponseEntity<?> convertUploadPDFPagesToImages(@RequestParam("file") MultipartFile file)
    {
        try (PDDocument document = PDDocument.load(file.getBytes()))
        {
            List<String> pageImages = new ArrayList<>();

            PDFRenderer renderer = new PDFRenderer(document);
            int numberOfPages = document.getNumberOfPages();
            int dpi = 300;

            for (int pageNumber = 0; pageNumber < numberOfPages; pageNumber++)
            {
                File tempImageFile = File.createTempFile("tempFile_" + pageNumber, ".png");
                BufferedImage bufferedImage = renderer.renderImageWithDPI(pageNumber, dpi, ImageType.RGB);
                ImageIO.write(bufferedImage, "png", tempImageFile);

                byte[] fileContent = FileUtils.readFileToByteArray(tempImageFile);
                String encodedString = Base64.getEncoder().encodeToString(fileContent);

                pageImages.add("data:image/png;base64," + encodedString);
            }

            return new ResponseEntity<>(pageImages, HttpStatus.OK);

        }
        catch (IOException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
