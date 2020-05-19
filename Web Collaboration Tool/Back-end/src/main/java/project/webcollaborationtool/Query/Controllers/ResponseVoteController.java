package project.webcollaborationtool.Query.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Query.Entities.ResponseVote;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Services.ResponseVoteService;

@RestController
public class ResponseVoteController
{
    @Autowired
    private ResponseVoteService responseVoteService;

    @PostMapping(path = "/{responseId}/vote")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<Response> vote(@RequestBody ResponseVote responseVote, @PathVariable Integer responseId)
    {
        return ResponseEntity.ok().body(this.responseVoteService.vote(responseVote, responseId));
    }
}
