package project.webcollaborationtool.User.Entities;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupMember;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Notifications.Entities.PrivateNotification;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
public class User
{
    @Id
    @NotNull
    private String username;

    @NotNull
    private String password;

    @Nullable
    private String email;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    private Profile profile;

    @JsonIgnore
    @OneToMany(mappedBy = "firstCollaborator")
    private Collection<PrivateCollaboration> collaborators;

    @JsonIgnore
    @OneToMany(mappedBy = "recipient")
    private Collection<PrivateNotification> notifications;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private Collection<GroupMember> groups;
}
