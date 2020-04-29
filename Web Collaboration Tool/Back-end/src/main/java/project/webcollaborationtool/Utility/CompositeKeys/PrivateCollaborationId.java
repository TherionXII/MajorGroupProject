package project.webcollaborationtool.Utility.CompositeKeys;

import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class PrivateCollaborationId implements Serializable
{
    private String collaboratorOneUsername;
    private String collaboratorTwoUsername;
}
