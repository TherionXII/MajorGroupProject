package project.webcollaborationtool.Entities;

import lombok.*;

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

    @NotNull
    private String email;
}
