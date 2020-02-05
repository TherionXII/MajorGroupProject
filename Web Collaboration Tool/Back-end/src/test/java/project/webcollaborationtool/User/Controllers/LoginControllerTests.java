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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class LoginControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testLoginUserWithValidData() throws Exception
    {
        var user = this.userRepository.save(new User("username", "password", "email"));

        this.mockMvc.perform(post("/login")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testLoginUserWithNonExistentUser() throws Exception
    {
        this.userRepository.save(new User("username", "password", "email"));

        this.mockMvc.perform(post("/login")
                             .content(this.objectMapper.writeValueAsString(new User("user", "password", "e")))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid username or password"));
    }

    @Test
    public void testLoginUserWithInvalidPassword() throws Exception
    {
        this.userRepository.save(new User("username", "password", "email"));

        this.mockMvc.perform(post("/login")
                             .content(this.objectMapper.writeValueAsString(new User("username", "pass", "email")))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid username or password"));
    }

    @Test
    public void testLoginUserWithInvalidUser()
    {
        try
        {
            this.mockMvc.perform(post("/login").content(""));
        }
        catch(Exception exception)
        {
            assertThat(exception).isNot(null);
        }
    }
}
