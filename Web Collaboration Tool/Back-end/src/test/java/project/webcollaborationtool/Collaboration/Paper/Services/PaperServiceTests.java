package project.webcollaborationtool.Collaboration.Paper.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Exceptions.InvalidGroupDataException;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Exceptions.InvalidPaperDataException;
import project.webcollaborationtool.Collaboration.Paper.Exceptions.InvalidQuestionDataException;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperQuestionRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PaperServiceTests
{
    @Mock
    private PaperRepository paperRepository;

    @Mock
    private GroupCollaborationRepository groupCollaborationRepository;

    @Mock
    private PaperQuestionRepository paperQuestionRepository;

    @InjectMocks
    private PaperService paperService;

    @Test
    public void testCreatePaperWithValidGroup()
    {
        var group = this.createMockGroup();
        var paper = this.createMockPaper();

        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.of(group));
        when(this.paperRepository.save(any())).thenReturn(new Paper());

        assertThatCode(() -> this.paperService.createPaper(paper, group.getId())).doesNotThrowAnyException();
    }

    @Test
    public void testCreatePaperWithInvalidGroup()
    {
        var group = this.createMockGroup();

        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.paperService.createPaper(this.createMockPaper(), group.getId())).isInstanceOf(InvalidGroupDataException.class);
    }

    @Test
    public void testConvertPagesToImagesWithValidPaper()
    {
        var paper = this.createMockPaper();

        when(this.paperRepository.findById(paper.getId())).thenReturn(Optional.of(paper));
        when(this.paperRepository.save(paper)).thenReturn(paper);

        assertThatCode(() -> this.paperService.convertPagesToImages(this.createMockFile(), paper.getId())).doesNotThrowAnyException();
    }

    @Test
    public void testConvertPagesToImagesWithInvalidPaper()
    {
        var paper = this.createMockPaper();

        when(this.paperRepository.findById(paper.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(()
                -> this.paperService.convertPagesToImages(this.createMockFile(), paper.getId())).isInstanceOf(InvalidPaperDataException.class);
    }

    @Test
    public void testGetPapersForGroupWithValidGroup()
    {
        var group = this.createMockGroup();

        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.of(group));
        when(this.paperRepository.findAllByGroupCollaboration(group)).thenReturn(new ArrayList<>());

        assertThatCode(() -> this.paperService.getPapersForGroup(group.getId())).doesNotThrowAnyException();
    }

    @Test
    public void testGetPapersForGroupWithInvalidGroup()
    {
        var group = this.createMockGroup();

        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.paperService.getPapersForGroup(group.getId())).isInstanceOf(InvalidGroupDataException.class);
    }

    @Test
    public void testGetPaperWithValidPaper()
    {
        var paper = this.createMockPaper();

        when(this.paperRepository.findById(paper.getId())).thenReturn(Optional.of(paper));

        assertThatCode(() -> this.paperService.getPaper(paper.getId())).doesNotThrowAnyException();
    }

    @Test
    public void testGetPaperWithInvalidPaper()
    {
        var paper = this.createMockPaper();

        when(this.paperRepository.findById(paper.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.paperService.getPaper(paper.getId())).isInstanceOf(InvalidPaperDataException.class);
    }

    @Test
    public void testUpdateQuestionWithValidQuestion()
    {
        var question = this.createMockQuestion();

        when(this.paperQuestionRepository.findById(question.getId())).thenReturn(Optional.of(question));
        when(this.paperQuestionRepository.save(question)).thenReturn(question);

        assertThatCode(() -> this.paperService.updateQuestion(question)).doesNotThrowAnyException();
    }

    @Test
    public void testUpdateQuestionWithInvalidQuestion()
    {
        var question = this.createMockQuestion();

        when(this.paperQuestionRepository.findById(question.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.paperService.updateQuestion(question)).isInstanceOf(InvalidQuestionDataException.class);
    }

    private GroupCollaboration createMockGroup()
    {
        var group = new GroupCollaboration();
        group.setId(0);

        return group;
    }

    private Paper createMockPaper()
    {
        var paper = new Paper();
        paper.setId(0);
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
        question.setId(0);

        return question;
    }
}
