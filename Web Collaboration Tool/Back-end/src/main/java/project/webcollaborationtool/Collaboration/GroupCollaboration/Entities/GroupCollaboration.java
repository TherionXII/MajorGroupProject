package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Collaboration.PDFProcessing.Entities.Paper;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Data
@Entity
public class GroupCollaboration
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "groupCollaboration")
    private Collection<GroupMember> groupMembers;

    @Nullable
    @OneToMany(mappedBy = "groupCollaboration")
    private Collection<Paper> examPapers;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @OneToOne
    @JsonManagedReference("group_thread")
    private GroupCollaborationThread thread;
}
