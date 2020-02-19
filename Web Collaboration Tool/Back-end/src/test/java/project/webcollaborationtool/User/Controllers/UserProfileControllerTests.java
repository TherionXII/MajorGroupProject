package project.webcollaborationtool.User.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
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
import project.webcollaborationtool.User.Repositories.ProfileRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class UserProfileControllerTests
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    private User user;
    private Profile profile;

    @BeforeEach
    public void setUp()
    {
        this.user = new User("username", "password", "email", null, null);

        this.profile = new Profile(user.getUsername(), "name", "surname", "gender", "institution");
        this.user.setProfile(profile);

        this.userRepository.save(user);
    }

    @Test
    public void testUpdateProfileWithValidData() throws Exception
    {
        var updatedProfile = new Profile();
        updatedProfile.setName("new name");
        updatedProfile.setSurname("new surname");
        updatedProfile.setGender("new gender");
        updatedProfile.setInstitution("new institution");

        this.mockMvc.perform(post("/" + this.user.getUsername() + "/updateProfile")
                             .content(this.objectMapper.writeValueAsString(updatedProfile))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

        var resultProfile = this.profileRepository.findById(this.user.getUsername()).orElseThrow();
        assertThat(resultProfile.getName()).isEqualTo(updatedProfile.getName());
        assertThat(resultProfile.getSurname()).isEqualTo(updatedProfile.getSurname());
        assertThat(resultProfile.getGender()).isEqualTo(updatedProfile.getGender());
        assertThat(resultProfile.getInstitution()).isEqualTo(updatedProfile.getInstitution());
    }

    @Test
    public void testUpdateProfileWithNonExistentUser() throws Exception
    {
        var updatedProfile = new Profile();

        this.mockMvc.perform(post("/nonExistentUser/updateProfile")
                             .content(this.objectMapper.writeValueAsString(updatedProfile))
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));
    }

    @Test
    public void testUpdateProfileWithInvalidProfile() throws Exception
    {
        this.mockMvc.perform(post("/" + this.user.getUsername() + "/updateProfile")
                             .content("")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest());
    }

    @Test
    public void getProfileWithValidData() throws Exception
    {
        this.mockMvc.perform(get("/" + this.user.getUsername() + "/getUserProfile")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().string(this.objectMapper.writeValueAsString(this.profile)));
    }

    @Test
    public void getProfileWithNonExistentUser() throws Exception
    {
        this.mockMvc.perform(get("/nonExistentUser/getUserProfile")
                             .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Internal server error: invalid user data provided."));
    }
}
