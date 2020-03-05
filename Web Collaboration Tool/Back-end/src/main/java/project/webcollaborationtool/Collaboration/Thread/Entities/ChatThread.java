package project.webcollaborationtool.Collaboration.Thread.Entities;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "chat_type", discriminatorType = DiscriminatorType.STRING)
public class ChatThread
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Nullable
    @OneToMany(mappedBy = "thread")
    private Collection<Message> messages;

    @Nullable
    @OneToOne
    private Message lastMessage;
}
