package project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.Utility.CompositeKeys.PrivateCollaborationId;

import javax.persistence.*;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@IdClass(PrivateCollaborationId.class)
public class PrivateCollaboration
{
    @Id
    private String firstCollaborator;

    @Id
    private String secondCollaborator;

    @ManyToOne
    @JsonIgnore
    @MapsId("firstCollaborator")
    @JoinColumn(name = "firstCollaborator", referencedColumnName = "username")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonManagedReference("private_thread")
    private PrivateCollaborationThread thread;
}
