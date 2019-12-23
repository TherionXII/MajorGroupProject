package project.webcollaborationtool.Entities.Queries;

import org.springframework.lang.Nullable;
import project.webcollaborationtool.Entities.User.User;

import javax.persistence.*;

@Entity
public class QueryVote
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_username")
    private User user;

    @ManyToOne
    @JoinColumn(name = "query_id")
    private Query query;

    @Nullable
    private Boolean vote;
}
