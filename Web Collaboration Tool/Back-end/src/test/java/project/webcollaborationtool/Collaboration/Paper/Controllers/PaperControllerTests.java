package project.webcollaborationtool.Collaboration.Paper.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Entities.Position;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperPageRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperRepository;
import project.webcollaborationtool.Utility.PaperUpload.PaperUploadProcessor;

import javax.transaction.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class PaperControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private PaperPageRepository paperPageRepository;

    private GroupCollaboration group;
    private Paper paper;
    private PaperQuestion question;
    private PaperPage page;

    @BeforeEach
    public void setUp() throws IOException
    {
        this.group = this.groupCollaborationRepository.save(this.createMockGroup());
        this.paper = this.paperRepository.save(this.createMockPaper());
        this.question = this.createMockQuestion();
        this.page = this.paperPageRepository.save(this.createMockPage());
    }

    @Test
    public void testCreatePaperWithValidGroup() throws Exception
    {
        this.mockMvc.perform(post("/api/papers/" + this.group.getId() + "/createPaper")
                             .content(this.objectMapper.writeValueAsString(this.createMockPaper()))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testCreatePaperWithInvalidGroup() throws Exception
    {
        this.mockMvc.perform(post("/api/papers/-1/createPaper")
                             .content(this.objectMapper.writeValueAsString(this.createMockPaper()))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Test
    public void testGetPapersWithValidGroup() throws Exception
    {
        this.mockMvc.perform(get("/api/papers/" + this.group.getId() + "/getPapers")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetPapersWithInvalidGroup() throws Exception
    {
        this.mockMvc.perform(get("/api/papers/-1/getPapers")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Test
    public void testGetPaperWithValidPaper() throws Exception
    {
        this.mockMvc.perform(get("/api/papers/" + this.paper.getId() + "/getPaper")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetPaperWithInvalidPaper() throws Exception
    {
        this.mockMvc.perform(get("/api/papers/-1/getPaper")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Test
    public void testConvertUploadedPDFToImagesWithValidPaper() throws Exception
    {
        this.mockMvc.perform(multipart("/api/papers/" + this.paper.getId() + "/uploadPaper")
                             .file("file", this.createMockFile().getBytes()))
                    .andExpect(status().isOk());
    }

    @Test
    public void testConvertUploadedPDFToImagesWithInvalidPaper() throws Exception
    {
        this.mockMvc.perform(multipart("/api/papers/-1/uploadPaper")
                            .file("file", this.createMockFile().getBytes()))
                    .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Test
    public void testExtractQuestionWithValidData() throws Exception
    {
        this.mockMvc.perform(post("/api/papers/" + this.paper.getId() + "/" + this.page.getPageNumber() + "/extractText")
                            .content(this.objectMapper.writeValueAsString(this.question))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testExtractQuestionWithInvalidPaperData() throws Exception
    {
        this.mockMvc.perform(post("/api/papers/-1/" + this.page.getPageNumber() + "/extractText")
                             .content(this.objectMapper.writeValueAsString(this.question))
                             .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    private GroupCollaboration createMockGroup()
    {
        var group = new GroupCollaboration();
        group.setTitle("Title");
        group.setDescription("Description");

        return group;
    }

    private Paper createMockPaper()
    {
        var paper = new Paper();
        paper.setPaperName("name");
        paper.setPaperDescription("description");
        paper.setPages(new ArrayList<>());

        return paper;
    }

    private MultipartFile createMockFile() throws IOException
    {
        var bytes = Files.readAllBytes(new File("src/test/resources/MOCK PDF.pdf").toPath());

        return new MockMultipartFile("data", "file.pdf", MediaType.APPLICATION_PDF_VALUE, bytes);
    }

    private PaperQuestion createMockQuestion()
    {
        var question = new PaperQuestion();
        question.setQuestionPosition(this.getPosition());
        question.setText("text");

        return question;
    }

    private PaperPage createMockPage() throws IOException
    {
        var bytes = Files.readAllBytes(new File("src/test/resources/MOCK PDF.pdf").toPath());

        var file = new MockMultipartFile("data", "file.pdf", MediaType.APPLICATION_PDF_VALUE, bytes);

        var document = PDDocument.load(file.getBytes());

        var paperPage = new PaperPage();
        paperPage.setPageOriginal(PaperUploadProcessor.getEncodedStrings(document).get(0));
        paperPage.setPageNumber(0);
        paperPage.setExamPaper(this.paper);

        return paperPage;
    }

    private Position getPosition()
    {
        var position = new Position();
        position.setX1(0);
        position.setX2(10);
        position.setY1(0);
        position.setY2(10);

        return position;
    }
}
