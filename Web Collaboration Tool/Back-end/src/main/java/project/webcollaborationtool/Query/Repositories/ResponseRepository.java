package project.webcollaborationtool.Query.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Response;

import java.util.Collection;

public interface ResponseRepository extends JpaRepository<Response, Integer>
{
    Collection<Response> findTop10ByUsernameOrderByCreatedAtDesc(String username);
}
