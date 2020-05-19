package project.webcollaborationtool.Collaboration.Thread.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@DiscriminatorValue("group_collaboration_thread")
public class GroupCollaborationThread extends ChatThread
{
    @OneToOne
    @JsonBackReference("group_thread")
    private GroupCollaboration groupCollaboration;
}
