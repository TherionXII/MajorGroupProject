package project.webcollaborationtool.Collaboration.PDFProcessing.Services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.Paper;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.PDFProcessing.Repositories.PaperPageRepository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Repositories.PaperRepository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Utility.PDFProcessingUtility;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class PaperConversionService
{
    @Autowired
    private PDFProcessingUtility pdfProcessingUtility;

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private PaperPageRepository paperPageRepository;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    public Paper convertPagesToImages(MultipartFile multipartFile, Integer groupId) throws IOException, ExecutionException, InterruptedException
    {
        PDDocument document = PDDocument.load(multipartFile.getBytes());
        var examPaper = this.createExamPaper(this.extractStrings(this.getEncodedStrings(document)), groupId, multipartFile);

        document.close();

        return examPaper;
    }

    private ArrayList<CompletableFuture<String>> getEncodedStrings(PDDocument document) throws IOException
    {
        var asyncResults = new ArrayList<CompletableFuture<String>>();

        var renderer = new PDFRenderer(document);
        int numberOfPages = document.getNumberOfPages();

        for(int pageNumber = 0; pageNumber < numberOfPages; ++pageNumber)
            asyncResults.add(this.pdfProcessingUtility.convertPage(renderer, pageNumber));

        CompletableFuture.allOf(asyncResults.toArray(CompletableFuture[]::new)).join();

        return asyncResults;
    }

    private ArrayList<String> extractStrings(ArrayList<CompletableFuture<String>> asyncResults) throws InterruptedException, ExecutionException
    {
        var encodedStrings = new ArrayList<String>();
        for(var result : asyncResults)
            encodedStrings.add(result.get());

        return encodedStrings;
    }

    private Paper createExamPaper(ArrayList<String> paperPages, Integer groupId, MultipartFile file) throws IOException
    {
        var examPaper = new Paper();
        examPaper.setGroupCollaboration(this.groupCollaborationRepository.findById(groupId).orElseThrow());
        examPaper.setPages(new ArrayList<>());
        examPaper.setQuestions(new ArrayList<>());
        examPaper.setOriginalPaper(file.getBytes());

        examPaper = this.paperRepository.save(examPaper);

        for(var page : paperPages)
        {
            var paperPage = new PaperPage();
            paperPage.setPageOriginal(page);
            paperPage.setPageNumber(paperPages.indexOf(page));
            paperPage.setExamPaper(examPaper);

            this.paperPageRepository.save(paperPage);

            examPaper.getPages().add(paperPage);
        }

        return this.paperRepository.save(examPaper);
    }
}
