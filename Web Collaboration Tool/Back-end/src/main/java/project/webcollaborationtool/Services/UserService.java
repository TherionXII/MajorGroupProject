package project.webcollaborationtool.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.User;
import project.webcollaborationtool.Entities.UserInformation;
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

    public void createUser(@NotNull User user)
    {
        this.userRepository.save(user);
    }

    public void createUserInformation(@NotNull UserInformation userInformation)
    {
        this.userInformationRepository.save(userInformation);
    }

    public void changePassword(@NotNull String username, @NotNull String password)
    {
        var user = this.userRepository.findByUsername(username);
        user.setPassword(password);
        this.userRepository.save(user);
    }

    public void changeUserInformation(@NotNull User username, @NotNull UserInformation userInformation)
    {
        var updatedUserInformation = userInformationRepository.findByUsername(username);
        updatedUserInformation.setName(userInformation.getName());
        this.userInformationRepository.save(userInformation);
    }

}
