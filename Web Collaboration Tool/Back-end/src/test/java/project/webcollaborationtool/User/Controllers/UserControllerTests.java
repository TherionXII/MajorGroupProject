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
import project.webcollaborationtool.User.Entities.Profile;
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

    private User validUser;

    @BeforeEach
    public void setUp()
    {
        this.validUser = this.userRepository.save(new User("username", "password", "a@a.com", null, null, null));
    }

    @Test
    public void testCreateUserWithValidData() throws Exception
    {
        this.userRepository.deleteById(this.validUser.getUsername());

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(this.validUser))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().json("{\"username\" : \"username\"}"));

        var repositoryFindResult = this.userRepository.findByUsername(this.validUser.getUsername());
        assertThat(repositoryFindResult.getUsername()).isEqualTo(this.validUser.getUsername());
        assertThat(repositoryFindResult.getPassword()).isEqualTo(this.validUser.getPassword());
        assertThat(repositoryFindResult.getEmail()).isEqualTo(this.validUser.getEmail());
    }

    @Test
    public void testCreateUserWithInvalidUsername() throws Exception
    {
        this.userRepository.deleteById(this.validUser.getUsername());
        var user = new User(null, "password", "email", null, null, null);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));

        assertThat(this.userRepository.findByUsername(null)).isEqualTo(null);
    }

    @Test
    public void testCreateUserWithInvalidPassword() throws Exception
    {
        this.userRepository.deleteById(this.validUser.getUsername());
        var user = new User("username", null, "email", null, null, null);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));

        assertThat(this.userRepository.existsById(user.getUsername())).isEqualTo(false);
    }

    @Test
    public void testCreateUserWithInvalidEmail() throws Exception
    {
        this.userRepository.deleteById(this.validUser.getUsername());
        var user = new User("username", "password", null, null, null, null);

        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(user))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));

        assertThat(this.userRepository.existsById(user.getUsername())).isEqualTo(false);
    }

    @Test
    public void testCreateUserWhenUserExists() throws Exception
    {
        this.mockMvc.perform(post("/createUser")
                             .content(this.objectMapper.writeValueAsString(this.validUser))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("User with username " + this.validUser.getUsername() + " already exists"));
    }

    @Test
    public void testUpdateUserPassword() throws Exception
    {
        this.mockMvc.perform(post("/" + this.validUser.getUsername() + "/updatePassword")
                             .content("updatedPassword")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

        assertThat(this.userRepository.findByUsername(this.validUser.getUsername()).getPassword()).isEqualTo("updatedPassword");
    }

    @Test
    public void testUpdateUserPasswordWithInvalidPassword() throws Exception
    {
        this.mockMvc.perform(post("/" + this.validUser.getUsername() + "/updatePassword")
                             .content(" ")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));

        assertThat(this.userRepository.findByUsername(this.validUser.getUsername()).getPassword()).isNotEqualTo(" ");
    }

    @Test
    public void testUpdateUserPasswordWithNonExistentUser() throws Exception
    {
        this.mockMvc.perform(post("/user1/updatePassword")
                             .content(" ")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));
    }

    @Test
    public void testUpdateUserEmail() throws Exception
    {
        this.mockMvc.perform(post("/" + this.validUser.getUsername() + "/updateEmail")
                             .content("a@a.com")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

        assertThat(this.userRepository.findByUsername(this.validUser.getUsername()).getEmail()).isEqualTo("a@a.com");
    }

    @Test
    public void testUpdateUserEmailWithInvalidEmail() throws Exception
    {
        this.mockMvc.perform(post("/" + this.validUser.getUsername() + "/updateEmail")
                             .content(" ")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));

        assertThat(this.userRepository.findByUsername(this.validUser.getUsername()).getEmail()).isNotEqualTo(" ");
    }

    @Test
    public void testUpdateUserEmailWithNonExistentUser() throws Exception
    {
        this.mockMvc.perform(post("/user1/updateEmail")
                             .content("a@a.com")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));
    }
}
