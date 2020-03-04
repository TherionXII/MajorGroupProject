package project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.Utility.CompositeKeys.PrivateCollaborationId;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(PrivateCollaborationId.class)
public class PrivateCollaboration
{
    @Id
    private String collaboratorOneUsername;

    @Id
    private String collaboratorTwoUsername;

    @ManyToOne
    @MapsId("collaboratorOneUsername")
    @JoinColumn(name = "collaboratorOneUsername", referencedColumnName = "username")
    private User firstCollaborator;

    @ManyToOne
    @MapsId("collaboratorTwoUsername")
    @JoinColumn(name = "collaboratorTwoUsername", referencedColumnName = "username")
    private User secondCollaborator;
}
