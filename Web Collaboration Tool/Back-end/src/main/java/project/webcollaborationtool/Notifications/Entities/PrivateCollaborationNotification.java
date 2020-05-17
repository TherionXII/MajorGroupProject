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
@DiscriminatorValue("private_collaboration_notification")
public class PrivateCollaborationNotification extends PrivateNotification
{
    @NotNull
    private String sender;

    @Override
    public User getRecipient() { return super.getRecipient(); }
}
