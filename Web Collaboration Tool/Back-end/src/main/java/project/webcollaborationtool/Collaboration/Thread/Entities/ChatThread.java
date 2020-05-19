package project.webcollaborationtool.Collaboration.Thread.Entities;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Collection;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "chat_type", discriminatorType = DiscriminatorType.STRING)
public class ChatThread
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Nullable
    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private Collection<Message> messages;

    @Nullable
    @OneToOne
    private Message lastMessage;
}
