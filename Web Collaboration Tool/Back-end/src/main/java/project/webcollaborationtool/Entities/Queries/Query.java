package project.webcollaborationtool.Entities.Queries;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Entities.User.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Set;

@Entity
@ToString
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Query
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Nullable
    @JsonManagedReference
    @OneToOne(mappedBy = "query", cascade = CascadeType.ALL)
    private ParentQueryData parentQueryData;

    @NotNull
    @JsonManagedReference
    @OneToOne(mappedBy = "query", cascade = CascadeType.ALL)
    private QueryData queryData;

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

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "query")
    private Set<QueryVote> votes;
}
