package project.webcollaborationtool.Collaboration.Paper.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperPage;

public interface PaperPageRepository extends JpaRepository<PaperPage, Integer>
{
    PaperPage findByExamPaperAndPageNumber(Paper examPaper, Integer pageNumber);
}
