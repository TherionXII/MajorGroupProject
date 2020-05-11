package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Collaboration.Paper.Entities.Paper;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
public class GroupCollaboration
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @OneToMany(mappedBy = "groupCollaboration", cascade = CascadeType.ALL)
    private Collection<GroupMember> groupMembers;

    @Nullable
    @JsonIgnore
    @OneToMany(mappedBy = "groupCollaboration", cascade = CascadeType.ALL)
    private Collection<Paper> examPapers;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    @OneToOne
    @JsonManagedReference("group_thread")
    private GroupCollaborationThread thread;
}
