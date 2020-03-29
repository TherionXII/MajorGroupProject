package project.webcollaborationtool.Query.Entities;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Data
@Entity
@DiscriminatorValue("public_query")
@EqualsAndHashCode(callSuper = true)
public class PublicQuery extends Query
{
}
