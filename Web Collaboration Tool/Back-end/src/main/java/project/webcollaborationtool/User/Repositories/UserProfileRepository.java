package project.webcollaborationtool.User.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Entities.User;

import javax.validation.constraints.NotNull;

@Repository
public interface UserProfileRepository extends CrudRepository<Profile, Integer>
{
    Profile findByUser(@NotNull User user);
}
