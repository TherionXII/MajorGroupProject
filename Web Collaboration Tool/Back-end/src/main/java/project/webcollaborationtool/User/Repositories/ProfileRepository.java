package project.webcollaborationtool.User.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.User.Entities.Profile;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, String>
{
    Profile findByUsername(String username);
}
