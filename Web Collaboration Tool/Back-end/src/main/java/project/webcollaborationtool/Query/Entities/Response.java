package project.webcollaborationtool.Query.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
public class Response
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    private String response;

    @NotNull
    private String username;

    @NotNull
    private Integer rating;

    @ManyToOne
    private Query parent;

    @JsonIgnore
    @OneToMany(mappedBy = "response", cascade = CascadeType.ALL)
    private Collection<ResponseVote> votes;

    @CreationTimestamp
    private Timestamp createdAt;
}
