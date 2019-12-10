package project.webcollaborationtool.Services.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.User.Profile;
import project.webcollaborationtool.Entities.User.User;
import project.webcollaborationtool.Exceptions.UserExistsException;
import project.webcollaborationtool.Repositories.User.UserProfileRepository;
import project.webcollaborationtool.Repositories.User.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    public void createUser(@NotNull User user) throws UserExistsException
    {
        if(this.userRepository.existsById(user.getUsername())) throw new UserExistsException(user.getUsername());

        this.userRepository.save(user);
    }

    public void changePassword(@NotNull String username, @NotNull String password)
    {
        var user = this.userRepository.findByUsername(username);
        user.setPassword(password);
        this.userRepository.save(user);
    }


}
