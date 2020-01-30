package project.webcollaborationtool.User.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Entities.User;

import javax.validation.constraints.NotNull;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String>
{
    Profile findByUser(@NotNull User user);
    boolean existsByUser(@NotNull User user);
//    boolean deleteByUser()
}
