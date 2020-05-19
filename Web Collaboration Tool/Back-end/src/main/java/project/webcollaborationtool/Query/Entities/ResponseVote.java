package project.webcollaborationtool.Query.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Utility.CompositeKeys.ResponseVoteId;

import javax.persistence.*;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@IdClass(ResponseVoteId.class)
public class ResponseVote
{
    @Id
    private String username;

    @Id
    private Integer responseId;

    @ManyToOne
    @JsonIgnore
    @MapsId("responseId")
    @JoinColumn(name = "responseId", referencedColumnName = "id")
    private Response response;

    @Nullable
    private Boolean vote;
}
