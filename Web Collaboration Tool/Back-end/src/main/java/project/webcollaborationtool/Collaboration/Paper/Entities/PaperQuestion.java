package project.webcollaborationtool.Collaboration.Paper.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class PaperQuestion
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @NotNull
    private String text;

    @Lob
    @Nullable
    private String answer;

    @Transient
    @JsonInclude
    private Position questionPosition;

    @ManyToOne
    @JsonIgnore
    private Paper examPaper;

    @Nullable
    @OneToOne(cascade = CascadeType.ALL)
    private PaperImage questionImage;
}
