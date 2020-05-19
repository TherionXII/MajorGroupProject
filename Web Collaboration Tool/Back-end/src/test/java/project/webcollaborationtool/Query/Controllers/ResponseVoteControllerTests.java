package project.webcollaborationtool.Query.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
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
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Entities.ResponseVote;
import project.webcollaborationtool.Query.Repositories.PublicQueryRepository;
import project.webcollaborationtool.Query.Repositories.ResponseRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ResponseVoteControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PublicQueryRepository publicQueryRepository;

    @Autowired
    private ResponseRepository responseRepository;

    private PublicQuery query;
    private Response response;

    @BeforeEach
    public void setUp()
    {
        this.query = this.publicQueryRepository.save(this.createMockQuery());
        this.response = this.createMockResponse();
        this.response.setParent(this.query);

        this.response = this.responseRepository.save(response);

        System.out.println(response.getId());
    }

    @Test
    public void testVote() throws Exception
    {
        this.mockMvc.perform(post("/" + this.response.getId() + "/vote")
                             .content(this.objectMapper.writeValueAsString(this.createMockVote()))
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

    private ResponseVote createMockVote()
    {
        var vote = new ResponseVote();
        vote.setVote(true);
        vote.setUsername("username");

        return vote;
    }

    private Response createMockResponse()
    {
        var response = new Response();
        response.setResponse("response");
        response.setUsername("username");
        response.setVotes(new ArrayList<>());
        response.setRating(0);

        return response;
    }
}
