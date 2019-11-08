package project.webcollaborationtool.Entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User
{
    @Id
    private String userName;
}
