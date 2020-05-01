package project.webcollaborationtool.Collaboration.Request.Entities;

import lombok.Data;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class GroupCollaborationRequest
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private Integer groupId;

    @ManyToOne
    @MapsId("groupId")
    @JoinColumn(name = "groupId", referencedColumnName = "id")
    private GroupCollaboration group;

    @NotNull
    private String recipient;

    @NotNull
    private Boolean isAccepted;
}
