package project.webcollaborationtool.Collaboration.PDFProcessing.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.Paper;

public interface PaperRepository extends JpaRepository<Paper, Integer>
{
}
