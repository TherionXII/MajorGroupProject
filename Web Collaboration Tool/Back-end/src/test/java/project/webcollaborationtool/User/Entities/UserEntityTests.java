package project.webcollaborationtool.User.Entities;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.ConstraintViolationException;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
@ExtendWith(SpringExtension.class)
public class UserEntityTests
{
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testUserModelConstructors()
    {
        var user = new User();
        assertThat(user).isNotEqualTo(null);
    }

    @Test
    public void testUserModelSettersAndGetters()
    {
        var user = new User();

        user.setUsername("username");
        assertThat(user.getUsername()).isEqualTo("username");

        user.setPassword("password");
        assertThat(user.getPassword()).isEqualTo("password");

        user.setEmail("email");
        assertThat(user.getEmail()).isEqualTo("email");
    }

    @Test
    public void testToString()
    {
        var user = new User();
        assertThat(user.toString().contains("User")).isTrue();
    }
}