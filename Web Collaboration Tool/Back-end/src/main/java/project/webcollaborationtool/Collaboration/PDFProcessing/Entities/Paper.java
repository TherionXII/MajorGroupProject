package project.webcollaborationtool.Collaboration.PDFProcessing.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Data
@Entity
public class Paper
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @OneToMany(mappedBy = "examPaper")
    private Collection<PaperPage> pages;

    @Nullable
    @OneToMany(mappedBy = "examPaper")
    private Collection<PaperQuestion> questions;

    @JsonIgnore
    @ManyToOne
    private GroupCollaboration groupCollaboration;

    @Lob
    @NotNull
    private byte[] originalPaper;
}
