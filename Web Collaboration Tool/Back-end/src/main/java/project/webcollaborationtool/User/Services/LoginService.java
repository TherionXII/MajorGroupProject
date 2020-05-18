package project.webcollaborationtool.User.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidCredentialsException;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class LoginService
{
    @Autowired
    private UserRepository userRepository;

    public void login(@NotNull User user) throws InvalidCredentialsException
    {
        if(!this.userRepository.existsById(user.getUsername()))
            throw new InvalidCredentialsException();
        else if(!new BCryptPasswordEncoder().matches(user.getPassword(), this.userRepository.findByUsername(user.getUsername()).getPassword()))
            throw new InvalidCredentialsException();
    }
}
