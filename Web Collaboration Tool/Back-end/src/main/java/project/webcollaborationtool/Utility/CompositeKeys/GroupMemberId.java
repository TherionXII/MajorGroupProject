package project.webcollaborationtool.Utility.CompositeKeys;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class GroupMemberId implements Serializable
{
    private Integer groupId;
    private String memberUsername;
}
