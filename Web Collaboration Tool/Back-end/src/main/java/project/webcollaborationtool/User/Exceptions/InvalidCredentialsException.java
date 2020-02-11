package project.webcollaborationtool.User.Exceptions;

public class InvalidCredentialsException extends Exception
{
    public InvalidCredentialsException() { super("Could not find user with the specified credentials"); }
}
