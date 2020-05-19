package project.webcollaborationtool.Collaboration.Paper.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
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
