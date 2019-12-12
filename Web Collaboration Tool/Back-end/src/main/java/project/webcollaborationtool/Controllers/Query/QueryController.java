package project.webcollaborationtool.Controllers.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Entities.Queries.Query;
import project.webcollaborationtool.Services.Query.QueryService;

@RestController
public class QueryController
{
    @Autowired
    private QueryService queryService;

    @GetMapping(path = "/getRecentQueries")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Query[]> getRecentQueries()
    {
        return ResponseEntity.ok().body(queryService.getAllParentQueries().toArray(Query[]::new));
    }

    @PostMapping(path = "/{username}/createQuery")
    @CrossOrigin(methods = RequestMethod.POST, origins = "http://localhost:4200")
    public ResponseEntity<String> createParentQuery(@RequestBody Query query, @PathVariable String username)
    {
        this.queryService.createParentQuery(query, username);

        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/{username}/getLastQuery")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Query> getLastQueryForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.queryService.getLastQueryForUser(username));
    }

    @GetMapping(path = "/getQuery/{id}")
    @CrossOrigin(methods = RequestMethod.GET, origins = "http://localhost:4200")
    public ResponseEntity<Query> getQueryById(@PathVariable int id)
    {
        return ResponseEntity.ok().body(this.queryService.getQueryById(id));
    }
}
