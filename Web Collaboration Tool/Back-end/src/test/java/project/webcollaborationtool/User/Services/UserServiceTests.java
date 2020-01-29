package project.webcollaborationtool.User.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;
import project.webcollaborationtool.User.Exceptions.UserExistsException;
import project.webcollaborationtool.User.Repositories.UserRepository;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests
{
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testCreateUserWithValidData()
    {
        var user = new User("username", "password", "a@a.com", null);

        assertThatCode(() -> this.userService.createUser(user)).doesNotThrowAnyException();
    }

    @Test
    public void testCreateUserWhenAnotherUserExists()
    {
        var user = new User("username", "password", "a@a.com", null);

        when(userRepository.save(user)).thenThrow(UserExistsException.class);

        assertThatThrownBy(() -> this.userService.createUser(user)).isInstanceOf(UserExistsException.class);
    }

    @Test
    public void testCreateUserWithNullUser()
    {
        assertThatThrownBy(() -> this.userService.createUser(null)).isInstanceOf(NullPointerException.class);
    }

    @Test
    public void testCreateUserWithInvalidPrimaryKey()
    {
        var user = new User(null, null, null, null);

        assertThatThrownBy(() -> this.userService.createUser(user)).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void testCreateUserWithInvalidData()
    {
        var user = new User("user", null, null, null);

        assertThatThrownBy(() -> this.userService.createUser(user)).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void updateUserPassword()
    {
        var user = new User("username", "password1", null, null);

        when(this.userRepository.existsById("username")).thenReturn(true);
        when(this.userRepository.findByUsername("username")).thenReturn(user);

        assertThatCode(() -> this.userService.updatePassword(user.getUsername(), user.getPassword())).doesNotThrowAnyException();
    }

    @Test
    public void updateUserPasswordWithInvalidData()
    {
        assertThatThrownBy(() -> this.userService.updatePassword(null, "password")).isInstanceOf(InvalidUserDataException.class);
        assertThatThrownBy(() -> this.userService.updatePassword("username", null)).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void updateUserEmail()
    {
        var user = new User("username", "password", "email@email.com", null);

        when(this.userRepository.existsById("username")).thenReturn(true);
        when(this.userRepository.findByUsername("username")).thenReturn(user);

        assertThatCode(() -> this.userService.updateEmail(user.getUsername(), user.getEmail())).doesNotThrowAnyException();
    }

    @Test
    public void updateUserEmailWithInvalidData()
    {
        assertThatThrownBy(() -> this.userService.updateEmail(null, "email")).isInstanceOf(InvalidUserDataException.class);
        assertThatThrownBy(() -> this.userService.updateEmail("username", null)).isInstanceOf(InvalidUserDataException.class);
    }
}
