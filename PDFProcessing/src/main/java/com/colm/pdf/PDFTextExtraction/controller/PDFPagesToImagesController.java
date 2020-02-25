package com.colm.pdf.PDFTextExtraction.controller;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
public class PDFPagesToImagesController
{
//    @ResponseBody
//    @PostMapping("/pdf/fileUpload")
//    @CrossOrigin
//    public ResponseEntity<?> uploadPDFPagesAsImages(@RequestParam("file") MultipartFile file)
//    {
//        try (PDDocument document = PDDocument.load(file.getBytes()))
//        {
//            List<Object> imageURLsList = new ArrayList<>();
//
//            PDFRenderer renderer = new PDFRenderer(document);
//            int numberOfPages = document.getNumberOfPages();
//            int dpi = 300;
//
//            for (int page = 0; page < numberOfPages; page++)
//            {
//                String fileName = (page + 1) + ".png";
//                File pageImage = new File("Images\\" + fileName);
//                BufferedImage bufferedImage = renderer.renderImageWithDPI(page, dpi, ImageType.RGB);
//                ImageIO.write(bufferedImage, "png", pageImage);
//                String imageUri =
//                        ServletUriComponentsBuilder.fromCurrentContextPath().path("/Images/" + fileName).toUriString();
//                imageURLsList.add(imageUri);
//            }
//
//            return ResponseEntity.ok(imageURLsList);
//
//        }
//        catch (IOException e)
//        {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @ResponseBody
    @PostMapping("/pdf/fileUpload")
    @CrossOrigin
    public ResponseEntity<?> convertUploadPDFPagesToImages(@RequestParam("file") MultipartFile file)
    {
        try (PDDocument document = PDDocument.load(file.getBytes()))
        {
            List<String> pageImages = new ArrayList<>();

            PDFRenderer renderer = new PDFRenderer(document);
            int numberOfPages = document.getNumberOfPages();
            int dpi = 300;

            for (int page = 0; page < numberOfPages; page++)
            {
                String fileName = (page + 1) + ".png";
                File pageImage = new File("Images\\" + fileName);
                BufferedImage bufferedImage = renderer.renderImageWithDPI(page, dpi, ImageType.RGB);
                ImageIO.write(bufferedImage, "png", pageImage);

                byte[] fileContent = FileUtils.readFileToByteArray(pageImage);
                String encodedString = Base64.getEncoder().encodeToString(fileContent);

                pageImages.add("data:image/png;base64," + encodedString);
            }

            return new ResponseEntity<>(pageImages, HttpStatus.OK);

        }
        catch (IOException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @CrossOrigin
    @RequestMapping("/pdf/getPagesAsImages")
    public ResponseEntity<List<String>> getPagesAsImages()
    {
        List<String> pageImages = new ArrayList<>();
        File imagesFolder = new File("Images");

        for (final File file : imagesFolder.listFiles())
        {
            if (!file.isDirectory())
            {
                try
                {
                    String fileExtension = FilenameUtils.getExtension(file.getName());
                    byte[] fileContent = FileUtils.readFileToByteArray(file);
                    String encodedString = Base64.getEncoder().encodeToString(fileContent);

                    pageImages.add("data:image/" + fileExtension + ";base64," + encodedString);
                }
                catch (IOException e)
                {
                    e.printStackTrace();
                }
            }
        }
        return new ResponseEntity<>(pageImages, HttpStatus.OK);

    }

}
