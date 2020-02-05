package project.webcollaborationtool.Query.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.QueryVote;
import project.webcollaborationtool.Query.Services.QueryVoteService;

@RestController
public class QueryVoteController
{
    @Autowired
    private QueryVoteService queryVoteService;

    @PostMapping(path = "/vote")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<Query> vote(@RequestBody QueryVote queryVote)
    {
        return ResponseEntity.ok().body(this.queryVoteService.vote(queryVote, queryVote.getQueryId()));
    }
}
