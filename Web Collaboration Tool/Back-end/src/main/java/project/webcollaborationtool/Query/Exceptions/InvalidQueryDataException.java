package project.webcollaborationtool.Query.Exceptions;

public class InvalidQueryDataException extends RuntimeException
{
    public InvalidQueryDataException() { super("Internal server error: invalid query data provided."); }
}
