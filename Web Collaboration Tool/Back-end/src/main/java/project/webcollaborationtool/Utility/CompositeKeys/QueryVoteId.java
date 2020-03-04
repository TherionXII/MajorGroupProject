package project.webcollaborationtool.Utility.CompositeKeys;

import lombok.*;

import java.io.Serializable;

@Data
public class QueryVoteId implements Serializable
{
    private String username;

    private Integer queryId;
}
