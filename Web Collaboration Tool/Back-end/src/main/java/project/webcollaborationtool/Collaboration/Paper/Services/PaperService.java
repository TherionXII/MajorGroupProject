package project.webcollaborationtool.Collaboration.Paper.Services;

import org.apache.commons.io.FileUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperQuestionRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;

@Service
public class PaperService
{
    private final Integer DPI = 300;

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private PaperQuestionRepository paperQuestionRepository;

    public Paper createPaper(Paper paper, Integer groupId)
    {
        paper.setGroupCollaboration(this.groupCollaborationRepository.findById(groupId).orElseThrow());
        paper.setPages(new ArrayList<>());
        paper.setQuestions(new ArrayList<>());

        return this.paperRepository.save(paper);
    }

    public Collection<PaperPage> convertPagesToImages(MultipartFile multipartFile, Integer paperId) throws IOException
    {
        PDDocument document = PDDocument.load(multipartFile.getBytes());
        var encodedPages = this.getEncodedStrings(document);
        var savedPages = this.addPagesToPaper(encodedPages, paperId, multipartFile);

        document.close();

        return savedPages;
    }

    private ArrayList<String> getEncodedStrings(PDDocument document) throws IOException
    {
        var results = new ArrayList<String>();

        var renderer = new PDFRenderer(document);

        for(int pageNumber = 0; pageNumber < document.getNumberOfPages(); ++pageNumber)
            results.add(this.convertPage(renderer, pageNumber));

        return results;
    }

    private String convertPage(PDFRenderer renderer, Integer pageNumber) throws IOException
    {
        File tempImageFile = File.createTempFile("tempFile_" + pageNumber, ".png");
        BufferedImage bufferedImage = renderer.renderImageWithDPI(pageNumber, this.DPI, ImageType.RGB);
        ImageIO.write(bufferedImage, "png", tempImageFile);

        return Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(tempImageFile));
    }

    private Collection<PaperPage> addPagesToPaper(ArrayList<String> paperPages, Integer paperId, MultipartFile originalFile) throws IOException
    {
        var examPaper = this.paperRepository.findById(paperId).orElseThrow();

        examPaper.setOriginalPaper(originalFile.getBytes());

        for(var page : paperPages)
        {
            var paperPage = new PaperPage();
            paperPage.setPageOriginal(page);
            paperPage.setPageNumber(paperPages.indexOf(page));
            paperPage.setExamPaper(examPaper);

            examPaper.getPages().add(paperPage);
        }

        return this.paperRepository.save(examPaper).getPages();
    }

    public Collection<Paper> getPapersForGroup(Integer groupId)
    {
        return this.paperRepository.findAllByGroupCollaboration(this.groupCollaborationRepository.findById(groupId).orElseThrow());
    }

    public Paper getPaper(Integer paperId)
    {
        return this.paperRepository.findById(paperId).orElseThrow();
    }

    public PaperQuestion updateQuestion(PaperQuestion updatedQuestion)
    {
        var existingQuestion = this.paperQuestionRepository.findById(updatedQuestion.getId()).orElseThrow();
        existingQuestion.setAnswer(updatedQuestion.getAnswer());

        return this.paperQuestionRepository.save(existingQuestion);
    }
}
