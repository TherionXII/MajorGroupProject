package project.webcollaborationtool.Collaboration.Paper.Services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Entities.Position;
import project.webcollaborationtool.Collaboration.Paper.Exceptions.InvalidPaperDataException;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperPageRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperQuestionRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperRepository;
import project.webcollaborationtool.Utility.PaperUpload.PaperUploadProcessor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PaperTextExtractionServiceTests
{
    @Mock
    private PaperRepository paperRepository;

    @Mock
    private PaperPageRepository paperPageRepository;

    @Mock
    private PaperQuestionRepository paperQuestionRepository;

    @InjectMocks
    private PaperTextExtractionService paperTextExtractionService;

    @Test
    public void testExtractQuestionWithValidPaper() throws IOException
    {
        var paper = this.createMockPaper();
        var page = this.createMockPage();
        var question = this.createMockQuestion();

        when(this.paperRepository.findById(paper.getId())).thenReturn(Optional.of(paper));
        when(this.paperPageRepository.findByExamPaperAndPageNumber(paper, 0)).thenReturn(page);
        when(this.paperQuestionRepository.save(question)).thenReturn(question);

        assertThatCode(() -> this.paperTextExtractionService.extractQuestion(question, paper.getId(), page.getPageNumber())).doesNotThrowAnyException();
    }

    @Test
    public void testExtractQuestionWithInvalidPaper() throws IOException
    {
        var paper = this.createMockPaper();
        var page = this.createMockPage();
        var question = this.createMockQuestion();

        when(this.paperRepository.findById(paper.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                this.paperTextExtractionService.extractQuestion(question, paper.getId(), page.getPageNumber())).isInstanceOf(InvalidPaperDataException.class);
    }

    private Paper createMockPaper()
    {
        var paper = new Paper();
        paper.setId(0);

        return paper;
    }

    private PaperQuestion createMockQuestion()
    {
        var question = new PaperQuestion();
        question.setQuestionPosition(this.getPosition());

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
