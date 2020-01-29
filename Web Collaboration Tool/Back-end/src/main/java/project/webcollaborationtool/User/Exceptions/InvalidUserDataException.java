package project.webcollaborationtool.User.Exceptions;

public class InvalidUserDataException extends RuntimeException
{
    public InvalidUserDataException() { super("Invalid user data provided"); }
}
