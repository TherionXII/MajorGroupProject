package project.webcollaborationtool.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.User;
import project.webcollaborationtool.Entities.UserInformation;
import project.webcollaborationtool.Exceptions.UserExistsException;
import project.webcollaborationtool.Repositories.UserInformationRepository;
import project.webcollaborationtool.Repositories.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInformationRepository userInformationRepository;

    public void createUser(@NotNull User user) throws UserExistsException
    {
        if(this.userRepository.existsById(user.getUsername())) throw new UserExistsException(user.getUsername());

        this.userRepository.save(user);
    }

    public void createUserInformation(@NotNull String username, @NotNull UserInformation userInformation)
    {
        userInformation.setUser(this.userRepository.findByUsername(username));
        this.userInformationRepository.save(userInformation);
    }

    public void changePassword(@NotNull String username, @NotNull String password)
    {
        var user = this.userRepository.findByUsername(username);
        user.setPassword(password);
        this.userRepository.save(user);
    }

    public void changeUserInformation(@NotNull String username, @NotNull UserInformation userInformation)
    {
        var existingUserInformation = userInformationRepository.findByUser(userRepository.findByUsername(username));

        if(!existingUserInformation.getName().equals(userInformation.getName()))
            existingUserInformation.setName(userInformation.getName());

        userInformationRepository.save(existingUserInformation);
    }

    public UserInformation getUserInformation(@NotNull String username)
    {
        return this.userInformationRepository.findByUser(this.userRepository.findByUsername(username));
    }
}
