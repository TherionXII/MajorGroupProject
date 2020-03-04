package project.webcollaborationtool.Utility.CompositeKeys;

import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter @Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class PrivateCollaborationId implements Serializable
{
    private String collaboratorOneUsername;
    private String collaboratorTwoUsername;
}
