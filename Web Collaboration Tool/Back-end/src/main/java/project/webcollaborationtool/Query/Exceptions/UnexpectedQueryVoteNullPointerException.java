package project.webcollaborationtool.Query.Exceptions;

public class UnexpectedQueryVoteNullPointerException extends RuntimeException
{
    public UnexpectedQueryVoteNullPointerException() { super("Internal server error: null where @NotNull is expected."); }
}
