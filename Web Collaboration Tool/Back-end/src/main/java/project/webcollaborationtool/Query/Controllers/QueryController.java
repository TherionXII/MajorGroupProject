package project.webcollaborationtool.Query.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Query.Entities.ParentQueryData;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.QueryData;
import project.webcollaborationtool.Query.Services.QueryService;

@RestController
public class QueryController
{
    @Autowired
    private QueryService queryService;

    @GetMapping(path = "/getRecentQueries")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Query[]> getRecentQueries()
    {
        return ResponseEntity.ok().body(this.queryService.getRecentQueries().toArray(Query[]::new));
    }

    @GetMapping(path = "/{username}/getRecentQueries")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Query[]> getRecentQueriesForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.queryService.getRecentQueriesForUser(username).toArray(Query[]::new));
    }

    @GetMapping(path = "/{username}/getRecentResponses")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Integer[]> getRecentResponsesForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.queryService.getRecentResponsesForUser(username).toArray(Integer[]::new));
    }

    @PostMapping(path = "/{username}/createParentQuery")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<Integer> createParentQueryData(@RequestBody QueryData queryData, @PathVariable String username)
    {
        return ResponseEntity.ok().body(this.queryService.createParentQuery(queryData, username));
    }

    @PostMapping(path = "/{id}/createParentQueryData")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<Integer> createParentQuery(@RequestBody ParentQueryData parentQueryData, @PathVariable Integer id)
    {
        return ResponseEntity.ok().body(this.queryService.createParentQueryData(parentQueryData, id));
    }

    @GetMapping(path = "/getQuery/{id}")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Query> getQueryById(@PathVariable int id)
    {
        return ResponseEntity.ok().body(this.queryService.getQueryById(id));
    }

    @PostMapping(path = "{username}/{queryId}/submitResponse")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<String> submitResponse(@RequestBody String response, @PathVariable String username, @PathVariable Integer queryId)
    {
        this.queryService.submitResponse(response, username, queryId);

        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "{username}/{queryId}/vote")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<Query> vote(@RequestBody String vote, @PathVariable String username, @PathVariable Integer queryId)
    {
        return ResponseEntity.ok().body(this.queryService.vote(Boolean.valueOf(vote), username, queryId));
    }
}
