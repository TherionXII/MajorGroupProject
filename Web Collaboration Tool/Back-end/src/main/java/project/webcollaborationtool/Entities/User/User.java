package project.webcollaborationtool.Entities.User;

import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Entities.Queries.QueryVote;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@ToString
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class User
{
    @Id
    @NotNull
    private String username;

    @NotNull
    private String password;

    @Nullable
    private String email;

    @OneToMany(mappedBy = "user")
    private Set<QueryVote> votes;
}
