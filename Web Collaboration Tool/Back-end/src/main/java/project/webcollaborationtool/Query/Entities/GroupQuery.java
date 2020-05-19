package project.webcollaborationtool.Query.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@DiscriminatorValue("group_query")
public class GroupQuery extends Query
{
    @ManyToOne
    @JsonIgnore
    private GroupCollaboration groupCollaboration;
}
