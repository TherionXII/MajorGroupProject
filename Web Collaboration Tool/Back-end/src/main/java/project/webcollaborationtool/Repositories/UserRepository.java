package project.webcollaborationtool.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, String>
{
}
