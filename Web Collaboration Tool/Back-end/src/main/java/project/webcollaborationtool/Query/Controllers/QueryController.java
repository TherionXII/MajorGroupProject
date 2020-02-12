package project.webcollaborationtool.Query.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Query.Entities.Query;
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

    @GetMapping(path = "/getQuery/{id}")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Query> getQueryById(@PathVariable int id)
    {
        return ResponseEntity.ok().body(this.queryService.getQueryById(id));
    }

    @PostMapping(path = "/{username}/createQuery")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<Query> createQuery(@RequestBody Query query, @PathVariable String username)
    {
        return ResponseEntity.ok().body(this.queryService.createQuery(query, username));
    }

    @PostMapping(path = "{username}/{queryId}/createResponse")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<Query> createResponse(@RequestBody Query response, @PathVariable String username, @PathVariable Integer queryId)
    {
        return ResponseEntity.ok().body(this.queryService.createResponse(response, username, queryId));
    }
}
