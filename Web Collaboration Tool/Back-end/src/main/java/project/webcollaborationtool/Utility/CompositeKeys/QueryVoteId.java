package project.webcollaborationtool.Utility.CompositeKeys;

import lombok.*;

import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor
@EqualsAndHashCode
@AllArgsConstructor
public class QueryVoteId implements Serializable
{
    private String username;

    private Integer queryId;
}
