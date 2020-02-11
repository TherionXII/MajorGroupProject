package project.webcollaborationtool.User.Entities;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@ToString
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Profile
{
    @Id
    private String username;

    @Nullable
    private String name;

    @Nullable
    private String surname;

    @Nullable
    private String gender;

    @Nullable
    private String institution;
}
