package project.webcollaborationtool.Query.Services;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Repositories.QueryRepository;
import project.webcollaborationtool.User.Entities.User;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.util.ArrayList;

@ExtendWith(MockitoExtension.class)
public class QueryServiceTests
{
    @Mock
    private QueryRepository queryRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PublicQueryService publicQueryService;

    private User user;
    private ArrayList<Query> queries;
    
//    @BeforeEach
//    public void setUp()
//    {
//        this.user = new User("username", "p", "e", null);
//
//        this.queries = new ArrayList<>();
//
//        this.queries.add(new Query());
//        this.queries.get(0).setUser(user);
//        this.queries.get(0).setParent(new Query());
//        this.queries.get(0).setId(0);
//
//        this.queries.add(new Query());
//        this.queries.get(1).setUser(user);
//        this.queries.get(1).setParent(new Query());
//        this.queries.get(1).setId(1);
//    }

//    @Test
//    public void testGetRecentQueries()
//    {
//        when(this.queryRepository.findTop10ByParentOrderByCreatedAtDesc(null)).thenReturn(this.queries);
//
//        assertThat(this.queryService.getRecentQueries().size()).isEqualTo(this.queries.size());
//        assertThatCode(() -> this.queryService.getRecentQueries()).doesNotThrowAnyException();
//
//        when(this.queryRepository.findTop10ByParentOrderByCreatedAtDesc(null)).thenReturn(new ArrayList<>());
//
//        assertThat(this.queryService.getRecentQueries().size()).isEqualTo(0);
//        assertThatCode(() -> this.queryService.getRecentQueries()).doesNotThrowAnyException();
//    }
//
//    @Test
//    public void testGetRecentQueriesForUser()
//    {
//        when(this.userRepository.existsById(this.user.getUsername())).thenReturn(true);
//        when(this.userRepository.findByUsername(this.user.getUsername())).thenReturn(this.user);
//        when(this.queryRepository.findTop10ByUserAndParentOrderByCreatedAtDesc(this.user, null)).thenReturn(this.queries);
//
//        var resultList = this.queryService.getRecentQueriesForUser(this.user.getUsername());
//        assertThat(resultList.size()).isEqualTo(this.queries.size());
//
//        for(var query : resultList)
//            assertThat(query.getUser().getUsername()).isEqualTo(this.user.getUsername());
//    }
//
//    @Test
//    public void testGetRecentQueriesForUserWithNonExistentUser()
//    {
//        when(this.userRepository.existsById(this.user.getUsername())).thenReturn(false);
//
//        assertThatThrownBy(() -> this.queryService.getRecentQueriesForUser(this.user.getUsername())).isInstanceOf(InvalidUserDataException.class);
//    }

//    @Test
//    public void testGetRecentResponsesForUser()
//    {
//        when(this.userRepository.existsById(this.user.getUsername())).thenReturn(true);
//        when(this.userRepository.findByUsername(this.user.getUsername())).thenReturn(this.user);
//        when(this.queryRepository.findTop10ByUserOrderByCreatedAtDesc(this.user)).thenReturn(this.queries);
//
//        var resultList = this.queryService.getRecentResponsesForUser(this.user.getUsername());
//        assertThat(resultList.size()).isEqualTo(this.queries.size());
//
//        for(var index = 0; index < this.queries.size(); ++index)
//            assertThat(resultList.toArray(Integer[]::new)[index]).isEqualTo(this.queries.get(index).getId());
//    }
//
//    @Test
//    public void testGetRecentResponsesForUserWithNonExistentUser()
//    {
//        when(this.userRepository.existsById(this.user.getUsername())).thenReturn(false);
//
//        assertThatThrownBy(() -> this.queryService.getRecentResponsesForUser(this.user.getUsername())).isInstanceOf(InvalidUserDataException.class);
//    }

//    @Test
//    public void testCreateParentQueryWithValidData()
//    {
//        var queryData = new QueryData();
//        var query = new Query();
//
////        query.setId(0);
//        query.setQueryData(queryData);
//        query.setUser(this.user);
//
//        when(this.userRepository.existsById(this.user.getUsername())).thenReturn(true);
//        when(this.userRepository.findByUsername(this.user.getUsername())).thenReturn(this.user);
//        lenient().when(this.queryRepository.save(query)).thenReturn(query);
//
//        assertThatCode(() -> this.queryService.createParentQuery(queryData, this.user.getUsername())).doesNotThrowAnyException();
//    }
}
