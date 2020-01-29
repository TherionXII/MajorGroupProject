package project.webcollaborationtool.User.Exceptions;

public class InvalidCredentialsException extends Exception
{
    public InvalidCredentialsException() { super("Invalid username or password"); }
}
