package project.webcollaborationtool.Collaboration.PDFProcessing.Entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class PaperImage
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Transient
    @JsonInclude
    private Position imagePosition;

    @Lob
    @NotNull
    private String image;
}
