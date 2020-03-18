package project.webcollaborationtool.Request.Entities;

import lombok.Data;

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

    @NotNull
    private Boolean isAccepted;
}
