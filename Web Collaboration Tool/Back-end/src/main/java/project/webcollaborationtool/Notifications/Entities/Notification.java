package project.webcollaborationtool.Notifications.Entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "message_type", discriminatorType = DiscriminatorType.STRING, columnDefinition = "VARCHAR(255)")
public class Notification
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @CreationTimestamp
    private Timestamp createdAt;

    @Nullable
    private String title;

    @Nullable
    private String content;
}