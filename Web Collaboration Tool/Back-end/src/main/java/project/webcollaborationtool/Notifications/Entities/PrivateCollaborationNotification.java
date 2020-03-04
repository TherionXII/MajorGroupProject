package project.webcollaborationtool.Notifications.Entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.User.Entities.User;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@DiscriminatorValue("private_collaboration_notification")
public class PrivateCollaborationNotification extends PrivateNotification
{
    @NotNull
    private String sender;

    @Override
    public User getRecipient() { return super.getRecipient(); }
}
