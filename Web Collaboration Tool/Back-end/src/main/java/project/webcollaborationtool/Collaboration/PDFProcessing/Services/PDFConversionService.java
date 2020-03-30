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
import java.util.concurrent.ExecutionException;

@Service
public class PDFConversionService
{
    @Autowired
    private PDFProcessingUtility pdfProcessingUtility;

    public Collection<String> convertPagesToImages(MultipartFile multipartFile) throws IOException, ExecutionException, InterruptedException
    {
        PDDocument document = PDDocument.load(multipartFile.getBytes());

        var pageImages = new ArrayList<String>();

        var renderer = new PDFRenderer(document);
        int numberOfPages = document.getNumberOfPages();

        for (int pageNumber = 0; pageNumber < numberOfPages; pageNumber++)
            pageImages.add(this.pdfProcessingUtility.convertPage(renderer, pageNumber).get());

        return pageImages;
    }
}
