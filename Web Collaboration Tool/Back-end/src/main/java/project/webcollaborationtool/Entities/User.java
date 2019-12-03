package project.webcollaborationtool.Entities;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

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
}
