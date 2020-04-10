package project.webcollaborationtool.Collaboration.PDFProcessing.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.PaperQuestion;

@Repository
public interface PaperQuestionRepository extends JpaRepository<PaperQuestion, Integer>
{
}
