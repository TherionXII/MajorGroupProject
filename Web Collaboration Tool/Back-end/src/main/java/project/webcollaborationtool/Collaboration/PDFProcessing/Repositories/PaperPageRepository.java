package project.webcollaborationtool.Collaboration.PDFProcessing.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.Paper;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperPage;

public interface PaperPageRepository extends JpaRepository<PaperPage, Integer>
{
    PaperPage findByExamPaperAndPageNumber(Paper examPaper, Integer pageNumber);
}
