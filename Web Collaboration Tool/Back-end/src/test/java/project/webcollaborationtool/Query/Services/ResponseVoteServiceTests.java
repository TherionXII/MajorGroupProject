package project.webcollaborationtool.Query.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Entities.ResponseVote;
import project.webcollaborationtool.Query.Exceptions.InvalidQueryDataException;
import project.webcollaborationtool.Query.Repositories.ResponseRepository;
import project.webcollaborationtool.Query.Repositories.ResponseVoteRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ResponseVoteServiceTests
{
    @Mock
    private ResponseVoteRepository responseVoteRepository;

    @Mock
    private ResponseRepository responseRepository;

    @InjectMocks
    private ResponseVoteService responseVoteService;

    @Test
    public void testVoteWithValidData()
    {
        var response = new Response();
        response.setVotes(new ArrayList<>());

        var vote = new ResponseVote();
        vote.setVote(true);

        response.getVotes().add(vote);

        when(this.responseRepository.findById(any())).thenReturn(Optional.of(response));
        when(this.responseVoteRepository.findAllByResponse(any())).thenReturn(new ArrayList<>());
        when(this.responseRepository.save(any())).thenReturn(response);

        assertThatCode(() -> this.responseVoteService.vote(new ResponseVote(), 0)).doesNotThrowAnyException();
    }

    @Test
    public void testVoteWithInvalidResponse()
    {
        when(this.responseRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> this.responseVoteService.vote(new ResponseVote(), 0)).isInstanceOf(InvalidQueryDataException.class);
    }
}
