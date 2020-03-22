package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.Utility.CompositeKeys.GroupMemberId;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@IdClass(GroupMemberId.class)
public class GroupMember
{
    @Id
    private Integer groupId;

    @Id
    private String memberUsername;

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

    @NotNull
    private Boolean isAdmin;
}
