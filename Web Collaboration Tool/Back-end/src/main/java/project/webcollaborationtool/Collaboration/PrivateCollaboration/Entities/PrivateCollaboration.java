package project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.webcollaborationtool.Collaboration.Thread.Entities.ChatThread;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
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
    @JsonIgnore
    @MapsId("collaboratorOneUsername")
    @JoinColumn(name = "collaboratorOneUsername", referencedColumnName = "username")
    private User firstCollaborator;

    @ManyToOne
    @JsonIgnore
    @MapsId("collaboratorTwoUsername")
    @JoinColumn(name = "collaboratorTwoUsername", referencedColumnName = "username")
    private User secondCollaborator;

    @OneToOne
    @JsonManagedReference("private_thread")
    private PrivateCollaborationThread thread;
}
