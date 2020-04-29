package project.webcollaborationtool.Collaboration.Paper.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Collaboration.Paper.Entities.PaperQuestion;

@Repository
public interface PaperQuestionRepository extends JpaRepository<PaperQuestion, Integer>
{
}
