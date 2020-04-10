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
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.PDFProcessing.Repositories.PaperPageRepository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Repositories.PaperQuestionRepository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Repositories.PaperRepository;

import javax.imageio.ImageIO;
import java.awt.*;
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

    @Autowired
    private PaperPageRepository paperPageRepository;

    @Autowired
    private PaperQuestionRepository paperQuestionRepository;

    public PaperQuestion extractQuestion(PaperQuestion question, Integer paperId, Integer pageNumber) throws IOException, TesseractException
    {
        var paper = this.paperRepository.findById(paperId).orElseThrow();
        var document = PDDocument.load(paper.getOriginalPaper());
        var position = new Rectangle(question.getQuestionPosition().getX1(), question.getQuestionPosition().getY1(),
                               question.getQuestionPosition().getX2() - question.getQuestionPosition().getX1(),
                               question.getQuestionPosition().getY2() - question.getQuestionPosition().getY1());

        String extractedText = extractTextByArea(document, pageNumber, position);

        if(extractedText.trim().isEmpty())
            extractedText = extractTextFromScannedImageByArea(this.paperPageRepository.findByExamPaperAndPageNumber(paper, pageNumber), position);

        question.setExamPaper(paper);
        question.setText(extractedText);

        document.close();

        return this.paperQuestionRepository.save(question);
    }

    private String extractTextFromScannedImageByArea(PaperPage paperPage, Rectangle rectangle) throws IOException, TesseractException
    {
        // set up tesseract for OCR
        ITesseract tesseract = new Tesseract();
        tesseract.setDatapath("C:/Users/theri/OneDrive/College/Semester Five/Year Project/Web Collaboration Tool/Back-end/tessdata");
        tesseract.setLanguage("eng");
        tesseract.setTessVariable("user_defined_dpi", "300");

        var image = ImageIO.read(new ByteArrayInputStream(Base64.getDecoder().decode(paperPage.getPageOriginal())));


        return tesseract.doOCR(image, rectangle);
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
}
