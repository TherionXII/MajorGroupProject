package project.webcollaborationtool.Repositories.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.User.Profile;
import project.webcollaborationtool.Entities.User.User;

import javax.validation.constraints.NotNull;

@Repository
public interface UserProfileRepository extends CrudRepository<Profile, Integer>
{
    Profile findByUser(@NotNull User user);
}
