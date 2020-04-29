package project.webcollaborationtool.Collaboration.Paper.Services;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperPageRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperQuestionRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperRepository;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;

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
