package project.webcollaborationtool.Collaboration.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.Utility.CompositeKeys.UserToUserId;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserToUserCollaboration
{
    @EmbeddedId
    private UserToUserId userToUserId;

    @ManyToOne
    @MapsId("collaboratorOneUsername")
    private User collaboratorOne;

    @ManyToOne
    @MapsId("collaboratorTwoUsername")
    private User collaboratorTwo;
}
