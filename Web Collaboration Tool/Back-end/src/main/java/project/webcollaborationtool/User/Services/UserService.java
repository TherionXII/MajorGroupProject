package project.webcollaborationtool.User.Services;

import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;
import project.webcollaborationtool.User.Exceptions.UserExistsException;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.validation.constraints.NotNull;

@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    public User createUser(@NotNull User user) throws UserExistsException, InvalidUserDataException
    {
        if(StringUtils.isEmpty(user.getUsername()) || StringUtils.isEmpty(user.getPassword()) || StringUtils.isEmpty(user.getEmail()))
            throw new InvalidUserDataException();

        if(this.userRepository.existsById(user.getUsername()))
            throw new UserExistsException(user.getUsername());

        return this.userRepository.save(user);
    }

    public void updatePassword(@NotNull String username, @NotNull String password)
    {
        if(!this.userRepository.existsById(username) || password.length() < 8)
            throw new InvalidUserDataException();

        var user = this.userRepository.findByUsername(username);
        user.setPassword(password);

        this.userRepository.save(user);
    }

    public void updateEmail(@NotNull String username, @NotNull String email)
    {
        if(!this.userRepository.existsById(username) || !EmailValidator.getInstance().isValid(email))
            throw new InvalidUserDataException();

        var user = this.userRepository.findByUsername(username);
        user.setEmail(email);

        this.userRepository.save(user);
    }
}
