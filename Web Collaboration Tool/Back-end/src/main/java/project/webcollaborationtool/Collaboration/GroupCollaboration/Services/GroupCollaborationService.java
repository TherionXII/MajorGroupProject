package project.webcollaborationtool.Collaboration.GroupCollaboration.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupMember;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupMemberRepository;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional
public class GroupCollaborationService
{
    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @Autowired
    private UserRepository userRepository;

    public Collection<GroupCollaboration> getGroupsForUser(String username)
    {
        var groupList = new ArrayList<GroupCollaboration>();

        this.userRepository.findByUsername(username).getGroups().forEach(groupMember -> groupList.add(groupMember.getGroupCollaboration()));

        return groupList;
    }

    public GroupCollaboration createGroup(GroupCollaboration groupCollaboration, String username)
    {
        groupCollaboration = this.groupCollaborationRepository.save(groupCollaboration);

        this.addMember(groupCollaboration, this.userRepository.findByUsername(username), true);

        return groupCollaboration;
    }

    public GroupCollaboration getGroupById(Integer groupId)
    {
        return this.groupCollaborationRepository.findById(groupId).orElseThrow();
    }

    public void addMember(Integer groupId, String username)
    {
        this.addMember(this.groupCollaborationRepository.findById(groupId).orElseThrow(), this.userRepository.findByUsername(username), false);
    }

    private void addMember(GroupCollaboration groupCollaboration, User user, Boolean isAdmin)
    {
        var groupMember = new GroupMember();
        groupMember.setMember(user);
        groupMember.setIsAdmin(isAdmin);
        groupMember.setGroupCollaboration(groupCollaboration);

        groupMember.setGroupId(groupCollaboration.getId());
        groupMember.setMemberUsername(user.getUsername());

        this.groupMemberRepository.save(groupMember);
    }


    public void makeAdmin(Integer groupId, String username)
    {
        var groupMember = this.groupMemberRepository.findByGroupIdAndMemberUsername(groupId, username);
        groupMember.setIsAdmin(true);

        this.groupMemberRepository.save(groupMember);
    }

    public void removeFromGroup(Integer groupId, String username)
    {
        this.groupMemberRepository.deleteByGroupIdAndMemberUsername(groupId, username);
    }
}
