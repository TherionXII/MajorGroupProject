package project.webcollaborationtool.Collaboration.Paper.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PositionEntityTests
{
    @Test
    public void testPositionConstructor()
    {
        var position = new Position();
        assertThat(position).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var position = new Position();

        position.setX1(0);
        assertThat(position.getX1()).isEqualTo(0);

        position.setX2(0);
        assertThat(position.getX2()).isEqualTo(0);

        position.setY1(0);
        assertThat(position.getY1()).isEqualTo(0);

        position.setY2(0);
        assertThat(position.getY2()).isEqualTo(0);
    }

    @Test
    public void testToString()
    {
        var position = new Position();
        assertThat(position.toString().contains("Position"));
    }
}
