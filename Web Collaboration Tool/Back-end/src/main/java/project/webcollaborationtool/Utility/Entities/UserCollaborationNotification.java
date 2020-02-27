package project.webcollaborationtool.Utility.Entities;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCollaborationNotification extends Notification
{
    @Nullable
    private String sender;

    @Nullable
    private boolean responded;

    @Nullable
    private boolean accepted;

    @Override
    public String getRecipient()
    {
        return super.getRecipient();
    }
}
