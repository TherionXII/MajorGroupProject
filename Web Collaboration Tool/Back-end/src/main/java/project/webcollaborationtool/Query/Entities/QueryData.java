package project.webcollaborationtool.Query.Entities;

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
public class QueryData
{
    @Id
    private Integer id;

    @MapsId
    @OneToOne
    @JoinColumn
    @JsonBackReference(value = "query_data-query")
    private Query query;

    @Lob
    @NotNull
    private String contents;

    @NotNull
    private Integer rating;
}
