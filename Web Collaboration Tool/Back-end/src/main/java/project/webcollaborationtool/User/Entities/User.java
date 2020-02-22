package project.webcollaborationtool.User.Entities;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Collaboration.Entities.UserToUserCollaboration;
import project.webcollaborationtool.Utility.Entities.CollaborationMessage;

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

    @Nullable
    @JsonIgnore
    @OneToMany(mappedBy = "collaboratorOne")
    private Collection<UserToUserCollaboration> collaborators;

    @Nullable
    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "notification", joinColumns = @JoinColumn(name = "user_username"),
               inverseJoinColumns = @JoinColumn(name = "collaboration_message_id"))
    private Collection<CollaborationMessage> notifications;
}
