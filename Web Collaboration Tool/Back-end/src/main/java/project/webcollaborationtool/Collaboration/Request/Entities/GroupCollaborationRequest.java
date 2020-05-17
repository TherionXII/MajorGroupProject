package project.webcollaborationtool.Collaboration.Request.Entities;

import lombok.*;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
public class GroupCollaborationRequest
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private Integer groupId;

    @NotNull
    private String recipient;

    @NotNull
    private Boolean isAccepted;
}
