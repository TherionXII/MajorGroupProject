package project.webcollaborationtool.Collaboration.Paper.Entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
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
