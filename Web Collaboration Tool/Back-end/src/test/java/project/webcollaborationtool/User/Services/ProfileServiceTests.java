package project.webcollaborationtool.User.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;
import project.webcollaborationtool.User.Repositories.ProfileRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProfileServiceTests
{
    @Mock
    private UserRepository userRepository;

    @Mock
    private ProfileRepository profileRepository;

    @InjectMocks
    private ProfileService profileService;

    @Test
    public void testUpdateProfileWithValidData()
    {
        var profile = new Profile();
        var user = new User("username", "password", "email", null);

        when(this.userRepository.existsById("username")).thenReturn(true);
        when(this.profileRepository.existsById("username")).thenReturn(true);
        when(this.profileRepository.findByUsername(user.getUsername())).thenReturn(profile);
        when(this.profileRepository.save(profile)).thenReturn(profile);

        assertThatCode(() -> this.profileService.updateProfile("username", profile)).doesNotThrowAnyException();
    }

    @Test
    public void testUpdateProfileWithNonExistentUser()
    {
        when(this.userRepository.existsById("username")).thenReturn(false);

        assertThatThrownBy(() -> this.profileService.updateProfile("username", new Profile())).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void testUpdateProfileWithInvalidData()
    {
        assertThatThrownBy(() -> this.profileService.updateProfile(null, new Profile())).isInstanceOf(InvalidUserDataException.class);

        when(this.userRepository.existsById("username")).thenReturn(true);
        assertThatThrownBy(() -> this.profileService.updateProfile("username", null)).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void testGetProfileWithValidData()
    {
        var user = new User("username", "password", "email", new Profile());

        when(this.userRepository.existsById("username")).thenReturn(true);
        when(this.profileRepository.existsById("username")).thenReturn(true);
        when(this.profileRepository.findByUsername(user.getUsername())).thenReturn(new Profile());

        assertThatCode(() -> this.profileService.getProfile("username")).doesNotThrowAnyException();
    }

    @Test
    public void testGetProfileWithNonExistentUser()
    {
        when(this.userRepository.existsById("username")).thenReturn(false);

        assertThatThrownBy(() -> this.profileService.getProfile("username")).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void testGetProfileWithInvalidUser()
    {
        assertThatThrownBy(() -> this.profileService.getProfile(null)).isInstanceOf(InvalidUserDataException.class);
    }
}
