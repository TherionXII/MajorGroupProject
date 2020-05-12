package project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupMember;
import project.webcollaborationtool.User.Entities.User;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Integer>
{
    GroupMember findByGroupIdAndMemberUsername(Integer groupId, String memberUsername);
    void deleteByGroupIdAndMemberUsername(Integer groupId, String memberUsername);
}
