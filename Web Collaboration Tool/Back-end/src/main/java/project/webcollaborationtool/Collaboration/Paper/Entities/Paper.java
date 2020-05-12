package project.webcollaborationtool.Collaboration.Paper.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
public class Paper
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String paperName;

    @NotNull
    private String paperDescription;

    @Nullable
    @JsonIgnore
    @OneToMany(mappedBy = "examPaper", cascade = CascadeType.ALL)
    private Collection<PaperPage> pages;

    @Nullable
    @OneToMany(mappedBy = "examPaper", cascade = CascadeType.ALL)
    private Collection<PaperQuestion> questions;

    @ManyToOne
    @JsonIgnore
    private GroupCollaboration groupCollaboration;

    @Lob
    @Nullable
    @JsonIgnore
    private byte[] originalPaper;
}
