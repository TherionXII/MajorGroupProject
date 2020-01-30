package project.webcollaborationtool.User.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import project.webcollaborationtool.User.Entities.Profile;
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

    public void createProfile(@NotNull String username, @NotNull Profile profile)
    {
        if(StringUtils.isEmpty(username) || !this.userRepository.existsById(username))
            throw new InvalidUserDataException();

        profile.setUser(this.userRepository.findByUsername(username));
        this.profileRepository.save(profile);
    }

    public void updateProfile(@NotNull String username, @NotNull Profile profile)
    {
        if(!this.userRepository.existsById(username))
            throw new InvalidUserDataException();

        var existingUserInformation = profileRepository.findByUser(userRepository.findByUsername(username));

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
        if(!this.userRepository.existsById(username))
            throw new InvalidUserDataException();

        return this.profileRepository.findByUser(this.userRepository.findByUsername(username));
    }
}
