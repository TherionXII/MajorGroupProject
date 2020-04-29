package project.webcollaborationtool.Notifications.Entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import project.webcollaborationtool.User.Entities.User;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Data
@Entity
@DiscriminatorValue("group_collaboration_notification")
@EqualsAndHashCode(callSuper = true)
public class GroupCollaborationNotification extends PrivateNotification
{
    @NotNull
    private Integer groupId;

    @Override
    public @NotNull User getRecipient() { return super.getRecipient(); }
}
