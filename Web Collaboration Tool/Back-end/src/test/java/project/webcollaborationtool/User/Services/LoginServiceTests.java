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
import static org.mockito.ArgumentMatchers.any;
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
        var user = new User();
        user.setUsername("user");
        user.setPassword("password");

        when(this.userRepository.existsById(any())).thenReturn(true);
        when(this.userRepository.findByUsername(any())).thenReturn(user);

        assertThatCode(() -> this.loginService.login(user)).doesNotThrowAnyException();
    }

    @Test
    public void testLoginUserWithNonExistentUser()
    {
        when(this.userRepository.existsById(any())).thenReturn(false);

        assertThatThrownBy(() -> this.loginService.login(new User())).isInstanceOf(InvalidCredentialsException.class);
    }

    @Test
    public void testLoginUserWithInvalidPassword()
    {
        var user = new User();
        user.setUsername("username");
        user.setPassword("password");

        var userWithInvalidPassword = new User();
        userWithInvalidPassword.setUsername("username");
        userWithInvalidPassword.setPassword("pass");

        when(this.userRepository.existsById(userWithInvalidPassword.getUsername())).thenReturn(true);
        when(this.userRepository.findByUsername(userWithInvalidPassword.getUsername())).thenReturn(user);

        assertThatThrownBy(() -> this.loginService.login(userWithInvalidPassword)).isInstanceOf(InvalidCredentialsException.class);
    }
}
