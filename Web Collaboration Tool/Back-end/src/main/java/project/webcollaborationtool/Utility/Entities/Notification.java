package project.webcollaborationtool.Utility.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.webcollaborationtool.User.Entities.User;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Notification
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String recipient;

    @ManyToMany
    @JoinTable(name = "notifications", joinColumns = @JoinColumn(name = "collaboration_message_id"),
               inverseJoinColumns = @JoinColumn(name = "user_username"))
    private Collection<User> users;

    public String getRecipient()
    {
        return this.recipient;
    }
}