package project.webcollaborationtool.Collaboration.PrivateCollaboration.Controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;


import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class PrivateCollaborationControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testIsCollaborating() throws Exception
    {
        this.mockMvc.perform(get("/api/privateCollaboration/user1/user2/isCollaborating"))
                    .andExpect(status().isOk());
    }

    @Test
    public void getAllCollaborationsForUser() throws Exception
    {
        this.mockMvc.perform(get("/api/privateCollaboration/user1/privateCollaborations"))
                    .andExpect(status().isOk());
    }
}
