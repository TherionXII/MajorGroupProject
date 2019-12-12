package project.webcollaborationtool.Entities.Queries;

import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Entities.User.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Collection;

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

    @NotNull
    private String title;

    @NotNull
    private String subtitle;

    @Lob
    @NotNull
    private String contents;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @Nullable
    @ManyToOne
    @Cascade(value = CascadeType.ALL)
    private Query parent;

    @Nullable
    @OneToMany(mappedBy = "parent")
    @Cascade(value = CascadeType.ALL)
    private Collection<Query> children;

    @ManyToOne
    private User user;
}
