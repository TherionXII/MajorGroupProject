package project.webcollaborationtool.Collaboration.GroupCollaboration.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupMember;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Exceptions.InvalidGroupDataException;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupMemberRepository;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Exceptions.InvalidUserDataException;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GroupCollaborationServiceTests
{
    @Mock
    private GroupCollaborationRepository groupCollaborationRepository;

    @Mock
    private GroupMemberRepository groupMemberRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private GroupCollaborationService groupCollaborationService;

    @Test
    public void testGetGroupsForUserWithValidUser()
    {
        var user = this.createMockUser();

        when(this.userRepository.existsById(user.getUsername())).thenReturn(true);
        when(this.userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(this.groupCollaborationRepository.findById(any())).thenReturn(Optional.of(new GroupCollaboration()));

        var result = this.groupCollaborationService.getGroupsForUser(user.getUsername());
        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    public void testGetGroupsWithNonExistentUser()
    {
        var user = this.createMockUser();

        when(this.userRepository.existsById(user.getUsername())).thenReturn(false);

        assertThatThrownBy(() -> this.groupCollaborationService.getGroupsForUser(user.getUsername())).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void testGetGroupsWithInvalidSavedGroupData()
    {
        var user = this.createMockUser();

        when(this.userRepository.existsById(user.getUsername())).thenReturn(true);
        when(this.userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(this.groupCollaborationRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.groupCollaborationService.getGroupsForUser(user.getUsername())).isInstanceOf(InvalidGroupDataException.class);
    }

    @Test
    public void testCreateGroupWithValidUser()
    {
        var user = this.createMockUser();
        var group = new GroupCollaboration();

        when(this.groupCollaborationRepository.save(any())).thenReturn(this.createSavedMockGroup());
        when(this.userRepository.existsById(user.getUsername())).thenReturn(true);
        when(this.userRepository.findByUsername(user.getUsername())).thenReturn(user);

        var result = this.groupCollaborationService.createGroup(group, user.getUsername());
        assertThat(result.getId()).isEqualTo(0);
    }

    @Test
    public void testCreateGroupWithNonExistentUser()
    {
        var user = this.createMockUser();
        var group = new GroupCollaboration();

        when(this.groupCollaborationRepository.save(group)).thenReturn(this.createSavedMockGroup());
        when(this.userRepository.existsById(user.getUsername())).thenReturn(false);

        assertThatThrownBy(() -> this.groupCollaborationService.createGroup(group, user.getUsername())).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void testGetGroupByIdWithValidGroup()
    {
        var group = this.createSavedMockGroup();

        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.of(group));

        assertThatCode(() -> this.groupCollaborationService.getGroupById(group.getId())).doesNotThrowAnyException();
    }

    @Test
    public void testGetGroupByIdWithInvalidGroup()
    {
        var group = this.createSavedMockGroup();

        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.groupCollaborationService.getGroupById(group.getId())).isInstanceOf(InvalidGroupDataException.class);
    }

    @Test
    public void testMakeAdminWithValidGroupMemberData()
    {
        var group = this.createSavedMockGroup();
        var user = this.createMockUser();
        var groupMember = this.createMockGroupMember();

        when(this.groupMemberRepository.findByGroupIdAndMemberUsername(group.getId(), user.getUsername())).thenReturn(groupMember);
        when(this.groupMemberRepository.save(any())).thenReturn(groupMember);

        assertThatCode(() -> this.groupCollaborationService.makeAdmin(group.getId(), user.getUsername())).doesNotThrowAnyException();
    }

    @Test
    public void testRemoveFromGroup()
    {
        var group = this.createSavedMockGroup();
        var user = this.createMockUser();

        doNothing().when(this.groupMemberRepository).deleteByGroupIdAndMemberUsername(group.getId(), user.getUsername());

        assertThatCode(() -> this.groupCollaborationService.removeFromGroup(group.getId(), user.getUsername())).doesNotThrowAnyException();
    }

    @Test
    public void testAddMemberWithValidMemberData()
    {
        var group = this.createSavedMockGroup();
        var user = this.createMockUser();

        when(this.userRepository.existsById(user.getUsername())).thenReturn(true);

        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.of(group));
        when(this.userRepository.findByUsername(user.getUsername())).thenReturn(user);

        assertThatCode(() -> this.groupCollaborationService.addMember(group.getId(), user.getUsername())).doesNotThrowAnyException();
    }

    @Test
    public void testAddMemberWithInvalidUserData()
    {
        var group = this.createSavedMockGroup();
        var user = this.createMockUser();

        when(this.userRepository.existsById(user.getUsername())).thenReturn(false);

        assertThatThrownBy(() -> this.groupCollaborationService.addMember(group.getId(), user.getUsername())).isInstanceOf(InvalidUserDataException.class);
    }

    @Test
    public void testAddMemberWithInvalidGroupData()
    {
        var group = this.createSavedMockGroup();
        var user = this.createMockUser();

        when(this.userRepository.existsById(user.getUsername())).thenReturn(true);
        when(this.groupCollaborationRepository.findById(group.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.groupCollaborationService.addMember(group.getId(), user.getUsername())).isInstanceOf(InvalidGroupDataException.class);
    }

    private User createMockUser()
    {
        var user = new User();
        user.setUsername("username");

        user.setGroups(new ArrayList<>());
        user.getGroups().add(new GroupMember());
        user.getGroups().add(new GroupMember());

        return user;
    }

    private GroupCollaboration createSavedMockGroup()
    {
        var groupCollaboration = new GroupCollaboration();
        groupCollaboration.setId(0);
        groupCollaboration.setGroupMembers(new ArrayList<>());

        return groupCollaboration;
    }

    private GroupMember createMockGroupMember()
    {
        var groupMember = new GroupMember();
        groupMember.setIsAdmin(false);

        return groupMember;
    }
}
