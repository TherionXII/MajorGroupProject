package project.webcollaborationtool.Collaboration.Request.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Repositories.GroupCollaborationRequestRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.transaction.Transactional;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class GroupCollaborationRequestControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    @Autowired
    private GroupCollaborationRequestRepository groupCollaborationRequestRepository;

    private GroupCollaboration groupCollaboration;

    @BeforeEach
    public void setUp()
    {
        this.createMockUser();
        this.createMockGroup();
    }

    @Test
    public void testGetGroupInvitationsForUser() throws Exception
    {
        this.mockMvc.perform(get("/api/groupRequests/username/getGroupInvitationsForUser"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testRespondToInvitation() throws Exception
    {
        this.mockMvc.perform(post("/api/groupRequests/respond")
                            .content(this.objectMapper.writeValueAsString(this.createMockRequest()))
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGroupInvitationsForGroup() throws Exception
    {
        this.mockMvc.perform(get("/api/groupRequests/0/getGroupInvitationsForGroup"))
                    .andExpect(status().isOk());
    }

    private GroupCollaborationRequest createMockRequest()
    {
        var request = new GroupCollaborationRequest();
        request.setIsAccepted(true);
        request.setRecipient("user");
        request.setGroupId(this.groupCollaboration.getId());

        return this.groupCollaborationRequestRepository.save(request);
    }

    private void createMockUser()
    {
        var user = new User();
        user.setUsername("user");
        user.setPassword("password");

        this.userRepository.save(user);
    }

    private void createMockGroup()
    {
        var groupCollaboration = new GroupCollaboration();
        groupCollaboration.setThread(new GroupCollaborationThread());
        groupCollaboration.setExamPapers(new ArrayList<>());
        groupCollaboration.setGroupMembers(new ArrayList<>());
        groupCollaboration.setDescription("description");
        groupCollaboration.setTitle("title");

        this.groupCollaboration = this.groupCollaborationRepository.save(groupCollaboration);
    }
}
