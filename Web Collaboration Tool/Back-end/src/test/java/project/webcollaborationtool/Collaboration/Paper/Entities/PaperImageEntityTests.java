package project.webcollaborationtool.Collaboration.Paper.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PaperImageEntityTests
{
    @Test
    public void testPaperImageConstructor()
    {
        var paperImage = new PaperImage();
        assertThat(paperImage).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var paperImage = new PaperImage();

        paperImage.setId(0);
        assertThat(paperImage.getId()).isEqualTo(0);

        paperImage.setImagePosition(new Position());
        assertThat(paperImage.getImagePosition()).isNotNull();

        paperImage.setImage("encodedImageString");
        assertThat(paperImage.getImage()).isEqualTo("encodedImageString");
    }

    @Test
    public void testToString()
    {
        var paperImage = new PaperImage();
        assertThat(paperImage.toString().contains("PaperImage")).isTrue();
    }
}
