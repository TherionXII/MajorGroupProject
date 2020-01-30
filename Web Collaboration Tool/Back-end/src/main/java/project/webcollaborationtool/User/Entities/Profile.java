package project.webcollaborationtool.User.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@ToString
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Profile
{
    @Id
    private String id;

    @MapsId
    @NotNull
    @OneToOne
    @JsonIgnore
    private User user;

    @Nullable
    private String name;

    @Nullable
    private String surname;

    @Nullable
    private String gender;

    @Nullable
    private String institution;
}
