package project.webcollaborationtool.Utility.Entities;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCollaborationMessage extends CollaborationMessage
{
    @Nullable
    private String sender;

    @Nullable
    private boolean responded;

    @Nullable
    private boolean accepted;
}
