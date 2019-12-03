package project.webcollaborationtool.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Entities.User;
import project.webcollaborationtool.Exceptions.InvalidCredentialsException;
import project.webcollaborationtool.Repositories.UserRepository;

@Service
public class LoginService
{
    @Autowired
    private UserRepository userRepository;

    public void Login(User user) throws InvalidCredentialsException
    {
        if(!this.userRepository.existsById(user.getUsername()))
            throw new InvalidCredentialsException();
        else if(!user.getPassword().equals(this.userRepository.findByUsername(user.getUsername()).getPassword()))
            throw new InvalidCredentialsException();
    }
}
