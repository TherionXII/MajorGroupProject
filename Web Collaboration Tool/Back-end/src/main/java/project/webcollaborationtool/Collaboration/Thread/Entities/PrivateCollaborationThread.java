package project.webcollaborationtool.Collaboration.Thread.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.EqualsAndHashCode;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("private_collaboration_thread")
public class PrivateCollaborationThread extends ChatThread
{
    @OneToOne
    @JsonBackReference("private_thread")
    private PrivateCollaboration privateCollaboration;
}
