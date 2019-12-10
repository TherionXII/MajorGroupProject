package project.webcollaborationtool.Services.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.User.Profile;
import project.webcollaborationtool.Repositories.User.UserProfileRepository;
import project.webcollaborationtool.Repositories.User.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class UserProfileService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    public void createUserProfile(@NotNull String username, @NotNull Profile profile)
    {
        profile.setUser(this.userRepository.findByUsername(username));
        this.userProfileRepository.save(profile);
    }

    public void changeUserProfile(@NotNull String username, @NotNull Profile profile)
    {
        var existingUserInformation = userProfileRepository.findByUser(userRepository.findByUsername(username));

        if(!existingUserInformation.getName().equals(profile.getName()))
            existingUserInformation.setName(profile.getName());

        userProfileRepository.save(existingUserInformation);
    }

    public Profile getUserProfile(@NotNull String username)
    {
        return this.userProfileRepository.findByUser(this.userRepository.findByUsername(username));
    }
}
