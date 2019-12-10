package project.webcollaborationtool.Entities.User;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @NotNull
    @OneToOne
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
