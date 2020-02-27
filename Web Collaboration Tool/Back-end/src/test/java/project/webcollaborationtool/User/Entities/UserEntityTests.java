package project.webcollaborationtool.User.Entities;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import project.webcollaborationtool.User.Repositories.UserRepository;
import project.webcollaborationtool.User.Entities.User;

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

        user = new User("username", "password", "email", null, null, null);
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
    public void testUserModelPersistenceWithValidData()
    {
        var user = new User("username", "password", "email", null, null, null);
        this.userRepository.save(user);

        var databaseQueryResult = this.userRepository.findByUsername("username");
        assertThat(databaseQueryResult.getUsername()).isEqualTo(user.getUsername());
        assertThat(databaseQueryResult.getPassword()).isEqualTo(user.getPassword());
        assertThat(databaseQueryResult.getEmail()).isEqualTo(user.getEmail());

    }

    @Test
    public void testUserModelPersistenceWithInvalidData()
    {
        var user = new User(null, null, null, null, null, null);

        var usernameException = Assertions.assertThrows(JpaSystemException.class, () -> this.userRepository.save(user));
        assertThat(usernameException.getMessage()).contains("ids for this class must be manually assigned before calling save()");

        user.setUsername("username");

        var passwordException = Assertions.assertThrows(ConstraintViolationException.class, () -> this.userRepository.saveAndFlush(user));
        assertThat(passwordException.getMessage()).contains("interpolatedMessage='must not be null', propertyPath=password");
    }
}