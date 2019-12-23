package project.webcollaborationtool.Entities.Queries;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParentQueryData
{
    @Id
    private Integer id;

    @MapsId
    @OneToOne
    @JoinColumn
    @JsonBackReference
    private Query query;

    @NotNull
    private String title;

    @NotNull
    private String subtitle;
}
