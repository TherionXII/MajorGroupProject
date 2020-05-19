package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import project.webcollaborationtool.User.Entities.User;
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

    @ManyToOne
    @JsonIgnore
    @MapsId("groupId")
    @JoinColumn(name = "groupId", referencedColumnName = "id")
    private GroupCollaboration groupCollaboration;

    @ManyToOne
    @JsonIgnore
    @MapsId("memberUsername")
    @JoinColumn(name = "memberUsername", referencedColumnName = "username")
    private User member;
}
