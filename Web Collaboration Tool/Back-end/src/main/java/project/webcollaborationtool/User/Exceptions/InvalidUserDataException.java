package project.webcollaborationtool.User.Exceptions;

public class InvalidUserDataException extends RuntimeException
{
    public InvalidUserDataException() { super("Internal server error: invalid user data provided."); }
}
