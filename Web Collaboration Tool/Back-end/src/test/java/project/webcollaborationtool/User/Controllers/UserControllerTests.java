package project.webcollaborationtool.User.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

    @BeforeEach
    public void cleanUp()
    {
        if(this.userRepository.existsById("username"))
            this.userRepository.deleteById("username");
    }

    @Test
    public void testCreateUserWithValidData() throws Exception
    {
        var user = new User("username", "password", "a@a.com", null);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().json("{\"username\" : \"username\"}"));

        var repositoryFindResult = this.userRepository.findByUsername(user.getUsername());
        assertThat(repositoryFindResult.getUsername()).isEqualTo(user.getUsername());
        assertThat(repositoryFindResult.getPassword()).isEqualTo(user.getPassword());
        assertThat(repositoryFindResult.getEmail()).isEqualTo(user.getEmail());
    }

    @Test
    public void testCreateUserWithInvalidUsername() throws Exception
    {
        var user = new User(null, "password", "email", null);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid user data provided"));

        assertThat(this.userRepository.findByUsername(null)).isEqualTo(null);
    }

    @Test
    public void testCreateUserWithInvalidPassword() throws Exception
    {
        var user = new User("username", null, "email", null);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid user data provided"));

        assertThat(this.userRepository.existsById(user.getUsername())).isEqualTo(false);
    }

    @Test
    public void testCreateUserWithInvalidEmail() throws Exception
    {
        var user = new User("username", "password", null, null);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid user data provided"));

        assertThat(this.userRepository.existsById(user.getUsername())).isEqualTo(false);
    }

    @Test
    public void testCreateUserWhenUserExists() throws Exception
    {
        var user = new User("username", "password", "a@a.com", null);
        this.userRepository.save(user);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("User with username " + user.getUsername() + " already exists"));
    }

    @Test
    public void testUpdateUserPassword() throws Exception
    {
        var user = new User("username", "password", "email", null);
        this.userRepository.save(user);

        this.mockMvc.perform(post("/" + user.getUsername() + "/updatePassword")
                             .content("updatedPassword")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

        assertThat(this.userRepository.findByUsername(user.getUsername()).getPassword()).isEqualTo("updatedPassword");
    }

    @Test
    public void testUpdateUserPasswordWithInvalidPassword() throws Exception
    {
        var user = new User("username", "password", "email", null);
        this.userRepository.save(user);

        this.mockMvc.perform(post("/" + user.getUsername() + "/updatePassword")
                             .content(" ")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid user data provided"));

        assertThat(this.userRepository.findByUsername(user.getUsername()).getPassword()).isNotEqualTo(" ");
    }

    @Test
    public void testUpdateUserPasswordWithInvalidUsername()
    {
        var user = new User("username", "password", "email", null);
        this.userRepository.save(user);

        try
        {
            this.mockMvc.perform(post("/ /updatePassword")
                                 .content("updatedPassword")
                                 .contentType(MediaType.APPLICATION_JSON));
        }
        catch(Exception exception)
        {
            assertThat(this.userRepository.findByUsername(user.getUsername()).getPassword()).isNotEqualTo("updatedPassword");
        }
    }

    @Test
    public void testUpdateUserPasswordWithNonExistentUser() throws Exception
    {
        this.mockMvc.perform(post("/user1/updatePassword")
                             .content(" ")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid user data provided"));
    }

    @Test
    public void testUpdateUserEmail() throws Exception
    {
        var user = new User("username", "password", "email", null);
        this.userRepository.save(user);

        this.mockMvc.perform(post("/" + user.getUsername() + "/updateEmail")
                             .content("a@a.com")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

        assertThat(this.userRepository.findByUsername(user.getUsername()).getEmail()).isEqualTo("a@a.com");
    }

    @Test
    public void testUpdateUserEmailWithInvalidEmail() throws Exception
    {
        var user = new User("username", "password", "email", null);
        this.userRepository.save(user);

        this.mockMvc.perform(post("/" + user.getUsername() + "/updateEmail")
                             .content(" ")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid user data provided"));

        assertThat(this.userRepository.findByUsername(user.getUsername()).getEmail()).isNotEqualTo(" ");
    }

    @Test
    public void testUpdateUserEmailWithInvalidUsername()
    {
        var user = new User("username", "password", "email", null);
        this.userRepository.save(user);

        try
        {
            this.mockMvc.perform(post("/ /updateEmail")
                                 .content("updatedEmail")
                                 .contentType(MediaType.APPLICATION_JSON));
        }
        catch(Exception exception)
        {
            assertThat(this.userRepository.findByUsername(user.getUsername()).getEmail()).isNotEqualTo("updatedEmail");
        }
    }

    @Test
    public void testUpdateUserEmailWithNonExistentUser() throws Exception
    {
        this.mockMvc.perform(post("/user1/updateEmail")
                             .content("a@a.com")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Invalid user data provided"));
    }
}
