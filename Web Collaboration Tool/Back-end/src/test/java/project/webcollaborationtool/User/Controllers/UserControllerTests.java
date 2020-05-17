package project.webcollaborationtool.User.Controllers;

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
import org.springframework.transaction.annotation.Transactional;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class UserControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void setUp()
    {
        this.user = new User();
        this.user.setUsername("username");
        this.user.setPassword("password");
        this.user.setEmail("a@a.com");
    }

    @Test
    public void testCreateUserWithValidData() throws Exception
    {
        this.user.setUsername("username2");
        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(this.user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testCreateUserWithInvalidUsername() throws Exception
    {
        this.user.setUsername(null);
        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateUserWithInvalidPassword() throws Exception
    {
        this.user.setPassword(null);
        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateUserWithInvalidEmail() throws Exception
    {
        this.user.setEmail(null);
        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateUserWhenUserExists() throws Exception
    {
        this.userRepository.save(user);
        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(this.user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
    }

    @Test
    public void testUpdateUserPassword() throws Exception
    {
        this.mockMvc.perform(post("/" + this.user.getUsername() + "/updatePassword")
                             .content("updatedPassword")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testUpdateUserEmail() throws Exception
    {
        this.mockMvc.perform(post("/" + this.user.getUsername() + "/updateEmail")
                             .content("a@a.com")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }
}
