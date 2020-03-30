package project.webcollaborationtool.Collaboration.PDFProcessing.Utility;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

@Service
public class PDFProcessingUtility
{
    private final static Integer DPI = 300;

    @Async("threadPoolTaskExecutor")
    public CompletableFuture<String> convertPage(PDFRenderer renderer, Integer pageNumber) throws IOException
    {
        File tempImageFile = File.createTempFile("tempFile_" + pageNumber, ".png");
        BufferedImage bufferedImage = renderer.renderImageWithDPI(pageNumber, PDFProcessingUtility.DPI, ImageType.RGB);
        ImageIO.write(bufferedImage, "png", tempImageFile);

        return CompletableFuture.completedFuture("data:image/png;base64," + Base64.getEncoder().encodeToString(FileUtils.readFileToByteArray(tempImageFile)));
    }
}
