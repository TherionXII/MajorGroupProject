package project.webcollaborationtool.User.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Repositories.UserProfileRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

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

    public void updateUserProfile(@NotNull String username, @NotNull Profile profile)
    {
        var existingUserInformation = userProfileRepository.findByUser(userRepository.findByUsername(username));

        if(existingUserInformation.getName() == null || !existingUserInformation.getName().equals(profile.getName()))
            existingUserInformation.setName(profile.getName());

        if(existingUserInformation.getSurname() == null || !existingUserInformation.getSurname().equals(profile.getSurname()))
            existingUserInformation.setSurname(profile.getSurname());

        if(existingUserInformation.getGender() == null || !existingUserInformation.getGender().equals(profile.getGender()))
            existingUserInformation.setGender(profile.getGender());

        if(existingUserInformation.getInstitution() == null || !existingUserInformation.getInstitution().equals(profile.getInstitution()))
            existingUserInformation.setInstitution(profile.getInstitution());

        userProfileRepository.save(existingUserInformation);
    }

    public Profile getUserProfile(@NotNull String username)
    {
        return this.userProfileRepository.findByUser(this.userRepository.findByUsername(username));
    }
}
