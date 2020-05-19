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
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;
import project.webcollaborationtool.Query.Entities.GroupQuery;

import javax.transaction.Transactional;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class GroupQueryControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    private GroupCollaboration groupCollaboration;

    @BeforeEach
    public void setUp()
    {
        this.groupCollaboration = this.groupCollaborationRepository.save(this.createSavedMockGroup());
    }

    @Test
    public void testCreateQuery() throws Exception
    {
        this.mockMvc.perform(post("/api/queries/groupQueries/username/" + this.groupCollaboration.getId() + "/createQuery")
                             .content(this.objectMapper.writeValueAsString(this.createMockQuery()))
                             .contentType(MediaType.APPLICATION_JSON))
                     .andExpect(status().isOk());
    }

    @Test
    public void testGetRecentQueries() throws Exception
    {
        this.mockMvc.perform(get("/api/queries/groupQueries/" + this.groupCollaboration.getId() + "/getRecentQueries"))
                    .andExpect(status().isOk());
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

    private GroupQuery createMockQuery()
    {
        var groupQuery = new GroupQuery();
        groupQuery.setContents("contents");

        return groupQuery;
    }
}
