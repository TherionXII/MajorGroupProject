package project.webcollaborationtool.Collaboration.Request.Controllers;

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
public class PrivateCollaborationRequestControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetCollaborationRequestsForUser() throws Exception
    {
        this.mockMvc.perform(get("/api/privateRequests/username/getPrivateCollaborationRequests"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testHasSentRequest() throws Exception
    {
        this.mockMvc.perform(get("/api/privateRequests/sender/recipient/hasSentRequest"))
                    .andExpect(status().isOk());
    }

    @Test
    public void hasReceivedRequest() throws Exception
    {
        this.mockMvc.perform(get("/api/privateRequests/recipient/sender/hasReceivedRequest"))
                    .andExpect(status().isOk());
    }
}
