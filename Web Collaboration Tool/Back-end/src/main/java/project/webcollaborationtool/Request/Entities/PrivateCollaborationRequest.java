package project.webcollaborationtool.Request.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.User.Entities.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class PrivateCollaborationRequest
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @NotNull
    private String sender;

    @NotNull
    private String recipient;

    @Nullable
    private Boolean isAccepted;
}
