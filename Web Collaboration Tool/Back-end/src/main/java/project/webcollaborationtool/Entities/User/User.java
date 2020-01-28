package project.webcollaborationtool.Entities.User;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Entities.Queries.QueryVote;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
public class User
{
    @Id
    @NotNull
    private String username;

    @NotNull
    private String password;

    @Nullable
    private String email;

    @Nullable
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<QueryVote> votes;
}
