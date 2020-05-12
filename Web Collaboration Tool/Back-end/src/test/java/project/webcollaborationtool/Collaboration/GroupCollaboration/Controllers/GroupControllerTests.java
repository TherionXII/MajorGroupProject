package project.webcollaborationtool.Collaboration.GroupCollaboration.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupMember;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupMemberRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;
import project.webcollaborationtool.User.Entities.Profile;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class GroupControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @Autowired
    private UserRepository userRepository;

    private User user;
    private GroupCollaboration groupCollaboration;

    @BeforeEach
    public void setUp()
    {
        this.user = this.userRepository.save(this.createMockUser());
        this.groupCollaboration = this.groupCollaborationRepository.save(this.createSavedMockGroup());
        this.groupMemberRepository.save(this.createSavedGroupMember());
    }

    @Test
    public void testCreateGroupWithValidUser() throws Exception
    {
        this.mockMvc.perform(post("/api/groups/" + this.user.getUsername() + "/createGroup")
                            .content(this.objectMapper.writeValueAsString(this.createMockGroup()))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testCreateGroupWithInvalidUser() throws Exception
    {
        this.mockMvc.perform(post("/api/groups/nonExistentUser/createGroup")
                            .content(this.objectMapper.writeValueAsString(this.createMockGroup()))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Test
    public void testGetGroupsWithValidUser() throws Exception
    {
        this.mockMvc.perform(get("/api/groups/" + this.user.getUsername() + "/getGroups"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetGroupsWithInvalidUser() throws Exception
    {
        this.mockMvc.perform(get("/api/groups/nonExistentUser/getGroups"))
                    .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Test
    public void testGetGroupWithValidGroup() throws Exception
    {
        this.mockMvc.perform(get("/api/groups/" + this.groupCollaboration.getId() + "/getGroup"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetGroupWithInvalidGroup() throws Exception
    {
        this.mockMvc.perform(get("/api/groups/-1/getGroup"))
                            .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    private User createMockUser()
    {
        var user = new User();
        user.setUsername("username");
        user.setPassword("password");
        user.setGroups(new ArrayList<>());

        var profile = new Profile();
        profile.setUsername(user.getUsername());
        user.setProfile(profile);

        return user;
    }

    private GroupCollaboration createMockGroup()
    {
        var group = new GroupCollaboration();
        group.setTitle("Title");
        group.setDescription("Description");

        return group;
    }

    private GroupCollaboration createSavedMockGroup()
    {
        var group = new GroupCollaboration();
        group.setTitle("Title");
        group.setDescription("Description");
        group.setExamPapers(new ArrayList<>());
        group.setGroupMembers(new ArrayList<>());
        group.setThread(new GroupCollaborationThread());

        return group;
    }

    private GroupMember createSavedGroupMember()
    {
        var groupMember = new GroupMember();
        groupMember.setGroupId(this.groupCollaboration.getId());
        groupMember.setMemberUsername(this.user.getUsername());
        groupMember.setIsAdmin(false);

        return groupMember;
    }
}
