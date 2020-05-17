package project.webcollaborationtool.Collaboration.Thread.Controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.ChatThread;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ThreadControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PrivateCollaborationRepository privateCollaborationRepository;

    @Autowired
    private UserRepository userRepository;

    private User firstCollaborator;
    private User secondCollaborator;

    private PrivateCollaboration collaboration;

    @BeforeEach
    public void setUp()
    {
        this.firstCollaborator = this.createMockUser("user1");
        this.secondCollaborator = this.createMockUser("user2");
        this.createMockCollaboration();
    }

    @Test
    public void testCreatePrivateThread() throws Exception
    {
        var url = "/api/chatThreads/" + this.firstCollaborator.getUsername() +
                  "/" + this.secondCollaborator.getUsername() + "/createPrivateThread";

        this.mockMvc.perform(get(url))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetMessagesForThreadWithValidThread() throws Exception
    {
        this.mockMvc.perform(get("/api/chatThreads/" + this.collaboration.getThread().getId() + "/getMessagesForThread"))
                    .andExpect(status().isOk());
    }

    private User createMockUser(String username)
    {
        var user = new User();
        user.setUsername(username);
        user.setPassword("password");

        return this.userRepository.save(user);
    }

    private void createMockCollaboration()
    {
        var collaboration = new PrivateCollaboration();
        collaboration.setFirstCollaborator(this.firstCollaborator.getUsername());
        collaboration.setSecondCollaborator(this.secondCollaborator.getUsername());
        collaboration.setUser(this.firstCollaborator);
        collaboration.setThread(new PrivateCollaborationThread());
        this.collaboration = this.privateCollaborationRepository.save(collaboration);

        var collaborationInverse = new PrivateCollaboration();
        collaborationInverse.setFirstCollaborator(this.secondCollaborator.getUsername());
        collaborationInverse.setSecondCollaborator(this.firstCollaborator.getUsername());
        collaborationInverse.setUser(this.secondCollaborator);
        this.privateCollaborationRepository.save(collaborationInverse);
    }
}
