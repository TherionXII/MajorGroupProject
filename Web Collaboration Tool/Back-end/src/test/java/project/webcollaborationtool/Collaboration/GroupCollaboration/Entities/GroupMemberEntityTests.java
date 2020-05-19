package project.webcollaborationtool.Collaboration.GroupCollaboration.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Entities.User;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class GroupMemberEntityTests
{
    @Test
    public void testGroupMemberEntityConstructor()
    {
        var groupMember = new GroupMember();
        assertThat(groupMember).isNotNull();
    }

    @Test
    public void testGettersAndSetters()
    {
        var groupMember = new GroupMember();

        groupMember.setGroupId(0);
        assertThat(groupMember.getGroupId()).isEqualTo(0);

        groupMember.setMemberUsername("username");
        assertThat(groupMember.getMemberUsername()).isEqualTo("username");

        groupMember.setGroupId(this.getMockGroup().getId());
        assertThat(groupMember.getGroupId()).isEqualTo(0);

        groupMember.setMemberUsername(this.getMockUser().getUsername());
        assertThat(groupMember.getMemberUsername()).isEqualTo("username");

        groupMember.setIsAdmin(true);
        assertThat(groupMember.getIsAdmin()).isTrue();
    }

    @Test
    public void testToString()
    {
        var groupMember = new GroupMember();
        assertThat(groupMember.toString().contains("GroupMember")).isTrue();
    }

    private GroupCollaboration getMockGroup()
    {
        var groupCollaboration = new GroupCollaboration();
        groupCollaboration.setId(0);
        groupCollaboration.setGroupMembers(new ArrayList<>());
        groupCollaboration.setExamPapers(new ArrayList<>());

        return groupCollaboration;
    }

    private User getMockUser()
    {
        var user = new User();
        user.setUsername("username");
        user.setPassword("password");

        var profile = new Profile();
        profile.setUsername(user.getUsername());

        user.setProfile(profile);

        return user;
    }
}
