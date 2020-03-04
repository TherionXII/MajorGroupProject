package project.webcollaborationtool.Query.Entities;

import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Utility.CompositeKeys.QueryVoteId;

import javax.persistence.*;

@Data
@Entity
@IdClass(QueryVoteId.class)
public class QueryVote
{
    @Id
    private String username;

    @Id
    private Integer queryId;

    @ManyToOne
    @MapsId("queryId")
    @JoinColumn(name = "queryId", referencedColumnName = "id")
    private Query query;

    @Nullable
    private Boolean vote;
}
