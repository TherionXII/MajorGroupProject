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
import static org.mockito.ArgumentMatchers.any;
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
        var user = new User();
        user.setUsername("user");
        user.setPassword("password");
        user.setEmail("a@a.com");

        when(this.userRepository.save(any())).thenReturn(new User());

        assertThatCode(() -> this.userService.createUser(user)).doesNotThrowAnyException();
    }

    @Test
    public void testCreateUserWhenAnotherUserExists()
    {
        var user = new User();
        user.setUsername("user");
        user.setPassword("password");
        user.setEmail("a@a.com");
        when(this.userRepository.existsById(any())).thenReturn(true);

        assertThatThrownBy(() -> this.userService.createUser(user)).isInstanceOf(UserExistsException.class);
    }

    @Test
    public void updateUserPassword()
    {
        when(this.userRepository.existsById(any())).thenReturn(true);
        when(this.userRepository.findByUsername(any())).thenReturn(new User());

        assertThatCode(() -> this.userService.updatePassword("username", "password")).doesNotThrowAnyException();
    }

    @Test
    public void updateUserEmail()
    {
        when(this.userRepository.existsById(any())).thenReturn(true);
        when(this.userRepository.findByUsername(any())).thenReturn(new User());

        assertThatCode(() -> this.userService.updateEmail("username", "email@email.com")).doesNotThrowAnyException();
    }
}
