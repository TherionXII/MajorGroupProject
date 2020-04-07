package project.webcollaborationtool.Collaboration.PDFProcessing.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @NotNull
    private String text;

    @Lob
    @NotNull
    private String originalImage;

    @ManyToOne
    @JsonIgnore
    private Paper examPaper;

    @OneToOne
    @Nullable
    private PaperImage paperImage;
}
