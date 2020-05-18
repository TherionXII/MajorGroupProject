package project.webcollaborationtool.User.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    private User nonExistentUser;
    private User userWithInvalidPassword;

    @BeforeEach
    public void setUp()
    {
        this.userRepository.save(this.createValidUser());
        this.nonExistentUser = this.createNonExistentUser();
        this.userWithInvalidPassword = this.createUserWithInvalidPassword();
    }

    @Test
    public void testLoginUserWithValidData() throws Exception
    {
        var user = new User();
        user.setUsername("username");
        user.setPassword("password");
        this.mockMvc.perform(post("/login")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
    }

    @Test
    public void testLoginUserWithNonExistentUser() throws Exception
    {
        this.mockMvc.perform(post("/login")
                             .content(this.objectMapper.writeValueAsString(this.nonExistentUser))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is(401));
    }

    @Test
    public void testLoginUserWithInvalidPassword() throws Exception
    {
        this.mockMvc.perform(post("/login")
                             .content(this.objectMapper.writeValueAsString(this.userWithInvalidPassword))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is(401));
    }

    private User createValidUser()
    {
        var user = new User();
        user.setUsername("username");
        user.setPassword(new BCryptPasswordEncoder().encode("password"));

        return user;
    }

    private User createNonExistentUser()
    {
        var user = new User();
        user.setUsername("user");
        user.setPassword("pass");

        return user;
    }

    private User createUserWithInvalidPassword()
    {
        var user = new User();
        user.setUsername("username");
        user.setPassword("pass");

        return user;
    }

}
