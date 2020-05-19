package project.webcollaborationtool.Query.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import project.webcollaborationtool.Query.Entities.PublicQuery;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class PublicQueryControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetRecentQueries() throws Exception
    {
        this.mockMvc.perform(get("/api/queries/publicQueries/getRecentQueries"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetRecentQueriesForUser() throws Exception
    {
        this.mockMvc.perform(get("/api/queries/publicQueries/username/getRecentQueries"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testGetRecentResponsesForUser() throws Exception
    {
        this.mockMvc.perform(get("/api/queries/publicQueries/username/getRecentResponses"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testCreateQuery() throws Exception
    {
        this.mockMvc.perform(post("/api/queries/publicQueries/username/createQuery")
                             .content(this.objectMapper.writeValueAsString(this.createMockQuery()))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    private PublicQuery createMockQuery()
    {
        var query = new PublicQuery();
        query.setContents("contents");

        return query;
    }
}
