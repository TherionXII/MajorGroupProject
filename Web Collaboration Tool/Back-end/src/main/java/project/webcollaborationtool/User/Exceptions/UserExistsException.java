package project.webcollaborationtool.User.Exceptions;

public class UserExistsException extends RuntimeException
{
    public UserExistsException(String username) { super("User with username " + username + " already exists"); }
}
