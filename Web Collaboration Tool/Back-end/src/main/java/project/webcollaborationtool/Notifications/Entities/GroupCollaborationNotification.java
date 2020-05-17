package project.webcollaborationtool.Notifications.Entities;

import lombok.*;
import project.webcollaborationtool.User.Entities.User;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@DiscriminatorValue("group_collaboration_notification")
public class GroupCollaborationNotification extends PrivateNotification
{
    @NotNull
    private Integer groupId;

    @Override
    public User getRecipient() { return super.getRecipient(); }
}
