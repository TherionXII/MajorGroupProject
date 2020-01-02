package project.webcollaborationtool.Entities.Queries;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Entities.User.User;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class QueryVote
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_username")
    @JsonBackReference(value = "query_vote-user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "query_id")
    @JsonBackReference(value = "query_vote-query")
    private Query query;

    @Nullable
    private Boolean vote;
}
