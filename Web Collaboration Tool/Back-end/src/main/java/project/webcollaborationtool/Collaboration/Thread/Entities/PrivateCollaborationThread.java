package project.webcollaborationtool.Collaboration.Thread.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.Collection;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@DiscriminatorValue("private_collaboration_thread")
public class PrivateCollaborationThread extends ChatThread
{
    @OneToMany
    @JsonBackReference("private_thread")
    private Collection<PrivateCollaboration> privateCollaboration;
}
