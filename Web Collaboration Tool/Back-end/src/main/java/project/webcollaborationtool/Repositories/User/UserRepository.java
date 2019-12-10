package project.webcollaborationtool.Repositories.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.User.User;

@Repository
public interface UserRepository extends CrudRepository<User, String>
{
    User findByUsername(String username);
}
