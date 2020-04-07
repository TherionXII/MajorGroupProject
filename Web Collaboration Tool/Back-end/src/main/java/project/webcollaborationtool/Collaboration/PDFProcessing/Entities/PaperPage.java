package project.webcollaborationtool.Collaboration.PDFProcessing.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class PaperPage
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private Integer pageNumber;

    @Lob
    @NotNull
    private String pageOriginal;

    @NotNull
    @ManyToOne
    @JsonIgnore
    private Paper examPaper;
}
