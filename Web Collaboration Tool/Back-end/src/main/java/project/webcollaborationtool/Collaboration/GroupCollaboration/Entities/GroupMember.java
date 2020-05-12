package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import lombok.*;
import project.webcollaborationtool.Utility.CompositeKeys.GroupMemberId;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@IdClass(GroupMemberId.class)
public class GroupMember
{
    @Id
    private Integer groupId;

    @Id
    private String memberUsername;

    @NotNull
    private Boolean isAdmin;
}
