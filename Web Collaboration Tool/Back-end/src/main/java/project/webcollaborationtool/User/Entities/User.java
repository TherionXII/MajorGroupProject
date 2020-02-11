package project.webcollaborationtool.User.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    private Profile profile;
}
