package project.webcollaborationtool.User.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.User.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>
{
    User findByUsername(String username);
}
