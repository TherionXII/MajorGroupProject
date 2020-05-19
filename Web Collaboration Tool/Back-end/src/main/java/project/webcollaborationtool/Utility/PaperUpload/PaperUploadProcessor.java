package project.webcollaborationtool.Utility.PaperUpload;

import org.apache.commons.io.FileUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;

public abstract class PaperUploadProcessor
{
    private static final Integer DPI = 300;

    public static ArrayList<String> getEncodedStrings(PDDocument document) throws IOException
    {
        var results = new ArrayList<String>();

        var renderer = new PDFRenderer(document);

        for(int pageNumber = 0; pageNumber < document.getNumberOfPages(); ++pageNumber)
            results.add(PaperUploadProcessor.convertPage(renderer, pageNumber));

        return results;
    }

    private static String convertPage(PDFRenderer renderer, Integer pageNumber) throws IOException
    {
        File tempImageFile = File.createTempFile("tempFile_" + pageNumber, ".png");
        BufferedImage bufferedImage = renderer.renderImageWithDPI(pageNumber, PaperUploadProcessor.DPI, ImageType.RGB);
        ImageIO.write(bufferedImage, "png", tempImageFile);

        return Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(tempImageFile));
    }
}
