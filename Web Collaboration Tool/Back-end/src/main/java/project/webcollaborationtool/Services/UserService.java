package project.webcollaborationtool.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.User;
import project.webcollaborationtool.Repositories.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    public void createUser(@NotNull User user)
    {
        this.userRepository.save(user);
    }
}
