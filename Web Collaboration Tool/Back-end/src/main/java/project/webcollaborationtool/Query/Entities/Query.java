package project.webcollaborationtool.Query.Entities;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Set;

@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "query_type", discriminatorType = DiscriminatorType.STRING)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Query
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Nullable
    private String title;

    @Nullable
    private String subtitle;

    @Lob
    @NotNull
    private String contents;

    @NotNull
    private Integer rating;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Nullable
    @ManyToOne(cascade = CascadeType.ALL)
    private Query parent;

    @Nullable
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private Collection<Query> children;

    @NotNull
    private String username;

    @JsonIgnore
    @OneToMany(mappedBy = "query")
    private Set<QueryVote> votes;
}
