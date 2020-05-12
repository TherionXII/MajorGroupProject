package project.webcollaborationtool.Collaboration.Paper.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PaperPageEntityTests
{
    @Test
    public void testPaperPageConstructor()
    {
        var paperPage = new PaperPage();
        assertThat(paperPage).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var paperPage = new PaperPage();

        paperPage.setId(0);
        assertThat(paperPage.getId()).isEqualTo(0);

        paperPage.setPageNumber(0);
        assertThat(paperPage.getPageNumber()).isEqualTo(0);

        paperPage.setPageOriginal("encodedPageString");
        assertThat(paperPage.getPageOriginal()).isEqualTo("encodedPageString");

        paperPage.setExamPaper(new Paper());
        assertThat(paperPage.getExamPaper()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var paperPage = new PaperPage();

        assertThat(paperPage.toString().contains("PaperPage")).isTrue();
    }
}
