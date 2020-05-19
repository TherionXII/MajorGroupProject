package project.webcollaborationtool.Query.Controllers;

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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Entities.ResponseVote;
import project.webcollaborationtool.Query.Repositories.PublicQueryRepository;

import javax.transaction.Transactional;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class QueryControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PublicQueryRepository publicQueryRepository;

    private PublicQuery publicQuery;

    @BeforeEach
    public void setUp()
    {
        this.publicQuery = this.publicQueryRepository.save(this.createMockQuery());
    }

    @Test
    public void testGetQueryById() throws Exception
    {
        this.mockMvc.perform(get("/api/queries/" + this.publicQuery.getId() + "/getQuery"))
                    .andExpect(status().isOk());
    }

    @Test
    public void testCreateResponse() throws Exception
    {
        this.mockMvc.perform(post("/api/queries/username/" + this.publicQuery.getId() + "/createResponse")
                             .content(this.objectMapper.writeValueAsString(this.createMockResponse()))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    private PublicQuery createMockQuery()
    {
        var query = new PublicQuery();
        query.setContents("contents");
        query.setUsername("username");
        query.setResponses(new ArrayList<>());

        return query;
    }

    private Response createMockResponse()
    {
        var response = new Response();
        response.setResponse("response");

        return response;
    }
}
