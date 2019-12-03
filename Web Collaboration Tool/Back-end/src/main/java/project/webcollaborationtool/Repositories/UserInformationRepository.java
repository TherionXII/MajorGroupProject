package project.webcollaborationtool.Repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Entities.User;
import project.webcollaborationtool.Entities.UserInformation;

import javax.validation.constraints.NotNull;

@Repository
public interface UserInformationRepository extends CrudRepository<UserInformation, Integer>
{
    UserInformation findByUser(@NotNull User user);
}
