package project.webcollaborationtool.Notifications.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import project.webcollaborationtool.User.Entities.User;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@DiscriminatorValue("private_notification")
public class PrivateNotification extends Notification
{
    @NotNull
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "username")
    private User recipient;
}
