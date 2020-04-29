package project.webcollaborationtool.Query.Entities;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import project.webcollaborationtool.Query.Repositories.QueryRepository;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
class QueryEntityTests
{
    @Autowired private QueryRepository queryRepository;
    @Autowired private UserRepository userRepository;

//    @Test
//    public void testQueryModelConstructors()
//    {
//        var query = new Query();
//        var user = new User("username", "password", "email");
//
//        assertThat(query).isNotEqualTo(null);
//
//        query = new Query(1,"queryTitle", "querySubtitle", "queryContents", 0,
//                Timestamp.valueOf(LocalDateTime.now()), null, null, null, user, null);
//
//        assertThat(query).isNotEqualTo(null);
//    }
//
//    @Test
//    public void testQueryModelSettersAndGetters()
//    {
//        var query = new Query();
//        var user = new User("username", "password", "email");
//        var timestamp = Timestamp.valueOf(LocalDateTime.now());
//
//        query.setId(1);
//        assertThat(query.getId()).isEqualTo(1);
//
//        query.setTitle("Title");
//        assertThat(query.getTitle()).isEqualTo("Title");
//
//        query.setSubtitle("SubTitle");
//        assertThat(query.getSubtitle()).isEqualTo("SubTitle");
//
//        query.setContents("Contents");
//        assertThat(query.getContents()).isEqualTo("Contents");
//
//        query.setRating(1);
//        assertThat(query.getRating()).isEqualTo(1);
//
//        query.setCreatedAt(timestamp);
//        assertThat(query.getCreatedAt()).isEqualTo(timestamp);
//
//        query.setUpdatedAt(timestamp);
//        assertThat(query.getUpdatedAt()).isEqualTo(timestamp);
//
//        query.setParent(null);
//        assertThat(query.getParent()).isEqualTo(null);
//
//        query.setChildren(null);
//        assertThat(query.getChildren()).isEqualTo(null);
//
//        query.setUser(user);
//        assertThat(query.getUser()).isEqualTo(user);
//
//        query.setVotes(null);
//        assertThat(query.getVotes()).isEqualTo(null);
//    }
//
//    @Test
//    public void testQueryModelPersistenceWithValidData()
//    {
//        var user = new User("username", "password", "email");
//        this.userRepository.saveAndFlush(user);
//
//        var query = new Query();
//        query.setTitle("queryTitle");
//        query.setSubtitle("querySubtitle");
//        query.setContents("queryContents");
//        query.setParent(null);
//        query.setChildren(null);
//        query.setUser(user);
//        query.setRating(0);
//
//        this.queryRepository.save(query);
//
//        var databaseQueryResult = this.queryRepository.findByTitle("queryTitle");
//
//        System.out.println(databaseQueryResult);
//        assertThat(databaseQueryResult.getTitle()).isEqualTo("queryTitle");
//        assertThat(databaseQueryResult.getSubtitle()).isEqualTo("querySubtitle");
//        assertThat(databaseQueryResult.getRating()).isEqualTo(0);
//        assertThat(databaseQueryResult.getParent()).isEqualTo(null);
//        assertThat(databaseQueryResult.getChildren()).isEqualTo(null);
//        assertThat(databaseQueryResult.getUser().getUsername()).isEqualTo(user.getUsername());
//        assertThat(databaseQueryResult.getVotes()).isEqualTo(null);
//    }

}