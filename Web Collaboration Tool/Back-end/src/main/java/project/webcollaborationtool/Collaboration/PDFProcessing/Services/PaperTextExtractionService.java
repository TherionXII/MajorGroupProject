package project.webcollaborationtool.Collaboration.PDFProcessing.Services;

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
import org.ghost4j.document.PDFDocument;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.PDFProcessing.Repositories.PaperRepository;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class PaperTextExtractionService
{
    @Autowired
    private PaperRepository paperRepository;

    public String extractQuestion(JSONObject position, Integer paperId, Integer pageNumber) throws IOException, TesseractException
    {
        Rectangle rectangle = toRectangle(position);

        var paper = paperRepository.findById(paperId).orElseThrow();
        var document = PDDocument.load(paper.getOriginalPaper());
        String extractedText = extractTextByArea(document, pageNumber, rectangle);

        System.out.println(extractedText);

        if (extractedText.trim().isEmpty())
        {
            var tempFile = File.createTempFile("tempFile_" + pageNumber, ".png");
            var image = ImageIO.read(new ByteArrayInputStream(Base64.getDecoder().decode(paper.getPages().toArray(PaperPage[]::new)[pageNumber].getPageOriginal())));
            ImageIO.write(image, "png", tempFile);
            extractedText = extractTextFromScannedImageByArea(tempFile, pageNumber, rectangle);
        }

//        List<String> imagesOnPageBase64 = extractAllImagesFromPDFPage(document, pageNumber);

        return extractedText;
    }

    private String extractTextFromScannedImageByArea(File tempImageFile, int pageNumber, Rectangle rectangle) throws IOException,
            TesseractException
    {
        // set up tesseract for OCR
        ITesseract tesseract = new Tesseract();
        tesseract.setDatapath("tessdata");
        tesseract.setLanguage("eng");
        tesseract.setTessVariable("user_defined_dpi", "300");

        String textResultFromOCR = tesseract.doOCR(tempImageFile, rectangle);

        tempImageFile.delete();

        return textResultFromOCR;
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

    private String extractTextByArea(PDDocument document, int pageNumber, Rectangle rectangle) throws IOException
    {
        PDPage page = document.getPage(pageNumber);
        PDFTextStripperByArea stripperByArea = new PDFTextStripperByArea();

        stripperByArea.setSortByPosition(true);
        stripperByArea.addRegion("Area1", rectangle);
        stripperByArea.extractRegions(page);
        return stripperByArea.getTextForRegion("Area1");
    }

    private Rectangle toRectangle(JSONObject position)
    {
        int x1 = position.getInt("x1");
        int y1 = position.getInt("y1");
        int x2 = position.getInt("x2");
        int y2 = position.getInt("y2");

        return new Rectangle(x1, y1, x2-x1, y2-y1);
    }
}
