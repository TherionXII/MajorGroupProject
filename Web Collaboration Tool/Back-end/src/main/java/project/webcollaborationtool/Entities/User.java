package project.webcollaborationtool.Entities;

import lombok.*;

import javax.persistence.Column;
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
    @Column(name = "username")
    private String userName;

    @NotNull
    private String password;
}
