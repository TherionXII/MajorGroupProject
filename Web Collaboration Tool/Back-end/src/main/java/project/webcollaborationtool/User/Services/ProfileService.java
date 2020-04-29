package project.webcollaborationtool.User.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;
import project.webcollaborationtool.User.Repositories.ProfileRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class ProfileService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public User createProfile(@NotNull User user)
    {
        user.setProfile(this.profileRepository.save(new Profile(user.getUsername(), null, null, null, null)));

        return this.userRepository.save(user);
    }

    public void updateProfile(@NotNull String username, @NotNull Profile profile)
    {
        if(!this.userRepository.existsById(username) || !this.profileRepository.existsById(username))
            throw new InvalidUserDataException();

        var existingUserInformation = profileRepository.findByUsername(username);

        if(existingUserInformation.getName() == null || !existingUserInformation.getName().equals(profile.getName()))
            existingUserInformation.setName(profile.getName());

        if(existingUserInformation.getSurname() == null || !existingUserInformation.getSurname().equals(profile.getSurname()))
            existingUserInformation.setSurname(profile.getSurname());

        if(existingUserInformation.getGender() == null || !existingUserInformation.getGender().equals(profile.getGender()))
            existingUserInformation.setGender(profile.getGender());

        if(existingUserInformation.getInstitution() == null || !existingUserInformation.getInstitution().equals(profile.getInstitution()))
            existingUserInformation.setInstitution(profile.getInstitution());

        profileRepository.save(existingUserInformation);
    }

    public Profile getProfile(@NotNull String username)
    {
        if(!this.userRepository.existsById(username) || !this.profileRepository.existsById(username))
            throw new InvalidUserDataException();

        return this.profileRepository.findByUsername(username);
    }
}
