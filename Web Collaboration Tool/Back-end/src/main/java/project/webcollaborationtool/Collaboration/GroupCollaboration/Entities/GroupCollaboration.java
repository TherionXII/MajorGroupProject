package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import lombok.Data;

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

    @NotNull
    private String title;

    @NotNull
    private String description;
}
