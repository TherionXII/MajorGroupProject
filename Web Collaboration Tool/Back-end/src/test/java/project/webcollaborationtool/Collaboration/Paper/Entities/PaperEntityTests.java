package project.webcollaborationtool.Collaboration.Paper.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PaperEntityTests
{
    @Test
    public void testPaperConstructor()
    {
        var paper = new Paper();
        assertThat(paper).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var paper = new Paper();

        paper.setId(0);
        assertThat(paper.getId()).isEqualTo(0);

        paper.setPaperName("paperName");
        assertThat(paper.getPaperName()).isEqualTo("paperName");

        paper.setPaperDescription("paperDescription");
        assertThat(paper.getPaperDescription()).isEqualTo("paperDescription");

        paper.setPages(new ArrayList<>());
        assertThat(paper.getPages()).isNotNull();
        assertThat(paper.getPages().size()).isEqualTo(0);

        paper.setQuestions(new ArrayList<>());
        assertThat(paper.getQuestions()).isNotNull();
        assertThat(paper.getQuestions().size()).isEqualTo(0);

        paper.setGroupCollaboration(new GroupCollaboration());
        assertThat(paper.getGroupCollaboration()).isNotNull();

        paper.setOriginalPaper(new byte[10]);
        assertThat(paper.getOriginalPaper()).isNotNull();
        assertThat(paper.getOriginalPaper().length).isEqualTo(10);
    }

    @Test
    public void testToString()
    {
        var paper = new Paper();
        assertThat(paper.toString().contains("Paper")).isTrue();
    }
}
