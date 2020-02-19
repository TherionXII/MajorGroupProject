package project.webcollaborationtool.User.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidCredentialsException;
import project.webcollaborationtool.User.Repositories.UserRepository;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class LoginServiceTests
{
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LoginService loginService;

    @Test
    public void testLoginUserWithValidData()
    {
        var user = new User("username", "password", "email", null, null);

        when(this.userRepository.existsById(user.getUsername())).thenReturn(true);
        when(this.userRepository.findByUsername(user.getUsername())).thenReturn(user);

        assertThatCode(() -> this.loginService.login(user)).doesNotThrowAnyException();
    }

    @Test
    public void testLoginUserWithNonExistentUser()
    {
        var user = new User("username", "password", "email", null, null);

        when(this.userRepository.existsById(user.getUsername())).thenReturn(false);

        assertThatThrownBy(() -> this.loginService.login(user)).isInstanceOf(InvalidCredentialsException.class);
    }

    @Test
    public void testLoginUserWithInvalidPassword()
    {
        var user = new User("username", "password", "email", null, null);
        var userWithInvalidPassword = new User("username", "pass", "email", null, null);

        when(this.userRepository.existsById(userWithInvalidPassword.getUsername())).thenReturn(true);
        when(this.userRepository.findByUsername(userWithInvalidPassword.getUsername())).thenReturn(user);

        assertThatThrownBy(() -> this.loginService.login(userWithInvalidPassword)).isInstanceOf(InvalidCredentialsException.class);
    }

    @Test
    public void testLoginUserWithInvalidUser()
    {
        assertThatThrownBy(() -> this.loginService.login(null)).isInstanceOf(NullPointerException.class);
    }
}
