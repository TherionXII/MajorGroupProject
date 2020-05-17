package project.webcollaborationtool.Collaboration.Paper.Services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Exceptions.InvalidGroupDataException;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperPage;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;
import project.webcollaborationtool.Collaboration.Paper.Exceptions.InvalidPaperDataException;
import project.webcollaborationtool.Collaboration.Paper.Exceptions.InvalidQuestionDataException;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperQuestionRepository;
import project.webcollaborationtool.Collaboration.Paper.Repositories.PaperRepository;
import project.webcollaborationtool.Utility.PaperUpload.PaperUploadProcessor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class PaperService
{
    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private PaperQuestionRepository paperQuestionRepository;

    public Paper createPaper(Paper paper, Integer groupId)
    {
        paper.setGroupCollaboration(this.groupCollaborationRepository.findById(groupId).orElseThrow(InvalidGroupDataException::new));
        paper.setPages(new ArrayList<>());
        paper.setQuestions(new ArrayList<>());

        return this.paperRepository.save(paper);
    }

    public Collection<PaperPage> convertPagesToImages(MultipartFile multipartFile, Integer paperId) throws IOException
    {
        PDDocument document = PDDocument.load(multipartFile.getBytes());

        var savedPages = this.addPagesToPaper(PaperUploadProcessor.getEncodedStrings(document), paperId, multipartFile);

        document.close();

        return savedPages;
    }

    public Collection<Paper> getPapersForGroup(Integer groupId)
    {
        return this.paperRepository.findAllByGroupCollaboration(this.groupCollaborationRepository.findById(groupId).orElseThrow(InvalidGroupDataException::new));
    }

    public Paper getPaper(Integer paperId)
    {
        return this.paperRepository.findById(paperId).orElseThrow(InvalidPaperDataException::new);
    }

    public PaperQuestion updateQuestion(PaperQuestion updatedQuestion)
    {
        var existingQuestion = this.paperQuestionRepository.findById(updatedQuestion.getId()).orElseThrow(InvalidQuestionDataException::new);
        existingQuestion.setAnswer(updatedQuestion.getAnswer());

        return this.paperQuestionRepository.save(existingQuestion);
    }

    private Collection<PaperPage> addPagesToPaper(ArrayList<String> paperPages, Integer paperId, MultipartFile originalFile) throws IOException
    {
        var examPaper = this.paperRepository.findById(paperId).orElseThrow(InvalidPaperDataException::new);

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
}
