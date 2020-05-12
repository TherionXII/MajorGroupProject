package project.webcollaborationtool.Collaboration.Paper.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PaperQuestionEntityTests
{
    @Test
    public void testPaperQuestionConstructor()
    {
        var paperQuestion = new PaperQuestion();
        assertThat(paperQuestion).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var paperQuestion = new PaperQuestion();

        paperQuestion.setId(0);
        assertThat(paperQuestion.getId()).isEqualTo(0);

        paperQuestion.setText("Text");
        assertThat(paperQuestion.getText()).isEqualTo("Text");

        paperQuestion.setAnswer("Answer");
        assertThat(paperQuestion.getAnswer()).isEqualTo("Answer");

        paperQuestion.setQuestionPosition(new Position());
        assertThat(paperQuestion.getQuestionPosition()).isNotNull();

        paperQuestion.setExamPaper(new Paper());
        assertThat(paperQuestion.getExamPaper()).isNotNull();

        paperQuestion.setQuestionImage(new PaperImage());
        assertThat(paperQuestion.getQuestionImage()).isNotNull();
    }

    @Test
    public void testToString()
    {
        var paperQuestion = new PaperQuestion();
        assertThat(paperQuestion.toString().contains("PaperQuestion")).isTrue();
    }
}
