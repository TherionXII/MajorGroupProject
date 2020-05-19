package project.webcollaborationtool.Query.Entities;

import lombok.*;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@DiscriminatorValue("public_query")
public class PublicQuery extends Query
{
}
