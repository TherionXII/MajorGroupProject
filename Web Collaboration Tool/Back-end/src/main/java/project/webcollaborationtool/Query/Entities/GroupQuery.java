package project.webcollaborationtool.Query.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Data
@Entity
@DiscriminatorValue("group_query")
@EqualsAndHashCode(callSuper = true)
public class GroupQuery extends Query
{
    @ManyToOne
    @JsonIgnore
    private GroupCollaboration groupCollaboration;
}
