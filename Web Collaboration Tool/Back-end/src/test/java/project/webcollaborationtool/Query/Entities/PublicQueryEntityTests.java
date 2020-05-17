package project.webcollaborationtool.Query.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class PublicQueryEntityTests
{
    @Test
    public void testPublicQueryConstructor()
    {
        var query = new PublicQuery();
        assertThat(query).isNotNull();
    }

    @Test
    public void testToString()
    {
        var query = new PublicQuery();
        assertThat(query.toString().contains("PublicQuery")).isTrue();
    }
}
