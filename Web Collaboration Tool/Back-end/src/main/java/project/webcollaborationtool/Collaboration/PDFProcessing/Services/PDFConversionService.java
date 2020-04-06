package project.webcollaborationtool.Collaboration.PDFProcessing.Services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.PDFProcessing.Utility.PDFProcessingUtility;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class PDFConversionService
{
    @Autowired
    private PDFProcessingUtility pdfProcessingUtility;

    public Collection<String> convertPagesToImages(MultipartFile multipartFile) throws IOException, ExecutionException, InterruptedException
    {
        PDDocument document = PDDocument.load(multipartFile.getBytes());

        var asyncResults = new ArrayList<CompletableFuture<String>>();

        var renderer = new PDFRenderer(document);
        int numberOfPages = document.getNumberOfPages();

        for(int pageNumber = 0; pageNumber < numberOfPages; ++pageNumber)
            asyncResults.add(this.pdfProcessingUtility.convertPage(renderer, pageNumber));

        CompletableFuture.allOf(asyncResults.toArray(CompletableFuture[]::new)).join();

        var encodedStrings = new ArrayList<String>();
        for(var result : asyncResults)
            encodedStrings.add(result.get());

        document.close();

        return encodedStrings;
    }
}
