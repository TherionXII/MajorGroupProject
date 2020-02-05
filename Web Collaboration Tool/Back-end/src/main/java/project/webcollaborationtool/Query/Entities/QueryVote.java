package project.webcollaborationtool.Query.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Utility.CompositeKeys.QueryVoteId;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
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
