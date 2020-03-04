package project.webcollaborationtool.Notifications.Entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.Nullable;
import project.webcollaborationtool.User.Entities.User;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@DiscriminatorColumn(name = "message_type", discriminatorType = DiscriminatorType.STRING, columnDefinition = "VARCHAR(255)")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
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