package project.webcollaborationtool.Collaboration.PDFProcessing;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.commons.io.FileUtils;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.pdmodel.graphics.PDXObject;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@Component
public class PDFTextExtractionController
{
    @ResponseBody
    @PostMapping("/pdf/textExtraction")
    @CrossOrigin
    public ResponseEntity<String>extractTextFromPDF(@RequestParam("file") MultipartFile file,
                                                    @RequestParam("pageNumber") int pageNumber,
                                                    @RequestParam("position") JSONObject position)
    {
        try (PDDocument document = PDDocument.load(file.getBytes()))
        {
            Rectangle rectangle = toRectangle(position);
            String extractedText = extractTextByArea(document, pageNumber, rectangle);

            if (extractedText.trim().isEmpty())
            {
                extractedText = extractTextFromScannedImageByArea(document, pageNumber, rectangle);
            }

            List<String> imagesOnPageBase64 = extractAllImagesFromPDFPage(document, pageNumber);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("extractedText", extractedText);
            jsonObject.put("imagesOnPage", imagesOnPageBase64);

            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private String extractTextByArea(PDDocument document, int pageNumber, Rectangle rectangle) throws IOException
    {
        PDPage page = document.getPage(pageNumber);
        PDFTextStripperByArea stripperByArea = new PDFTextStripperByArea();

        stripperByArea.setSortByPosition(true);
        stripperByArea.addRegion("Area1", rectangle);
        stripperByArea.extractRegions(page);
        return stripperByArea.getTextForRegion("Area1");
    }

    private String extractTextFromScannedImageByArea(PDDocument document, int pageNumber, Rectangle rectangle) throws IOException,
                                                                                          TesseractException
    {
        // set up tesseract for OCR
        ITesseract tesseract = new Tesseract();
        tesseract.setDatapath("tessdata");
        tesseract.setLanguage("eng");
        tesseract.setTessVariable("user_defined_dpi", "300");

        // Render page as an Image with 300 dpi and run OCR
        PDFRenderer pdfRenderer = new PDFRenderer(document);
        BufferedImage bufferedImage = pdfRenderer.renderImageWithDPI(pageNumber, 300, ImageType.RGB);

        File tempImageFile = File.createTempFile("tempFile_" + pageNumber, ".png");
        ImageIO.write(bufferedImage,"png", tempImageFile);

        String textResultFromOCR = tesseract.doOCR(tempImageFile, rectangle);

        tempImageFile.delete();

        return textResultFromOCR;
    }

    private Rectangle toRectangle(JSONObject position)
    {
        int x1 = position.getInt("x1");
        int y1 = position.getInt("y1");
        int x2 = position.getInt("x2");
        int y2 = position.getInt("y2");

        return new Rectangle(x1, y1, x2-x1, y2-y1);
    }

    private List<String> extractAllImagesFromPDFPage(PDDocument document, int pageNumber) throws IOException
    {
        List<String> imagesOnPage = new ArrayList<>();

        PDPage page = document.getPage(pageNumber);
        PDResources pdResources = page.getResources();
        File tempImageFile = File.createTempFile("tempFile", ".png");

        for (COSName cosName : pdResources.getXObjectNames())
        {
            PDXObject pdxObject = pdResources.getXObject(cosName);
            if (pdxObject instanceof PDImageXObject)
            {
                ImageIO.write(((PDImageXObject) pdxObject).getImage(),"PNG", tempImageFile);

                byte[] fileContent = FileUtils.readFileToByteArray(tempImageFile);
                String encodedString = Base64.getEncoder().encodeToString(fileContent);

                imagesOnPage.add("data:image/png;base64," + encodedString);
            }
        }
        tempImageFile.delete();
        return imagesOnPage;
    }

}
