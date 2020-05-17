package project.webcollaborationtool.Collaboration.Thread.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
public class Message
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String message;

    @ManyToOne
    @JsonIgnore
    private ChatThread thread;

    @CreationTimestamp
    private Timestamp createdAt;

    @NotNull
    private String sender;
}
