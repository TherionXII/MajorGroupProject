package project.webcollaborationtool.Query.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Query.Entities.PublicQuery;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Services.PublicQueryService;

import java.util.Collection;

@RestController
@RequestMapping("/api/queries/publicQueries")
@CrossOrigin(origins = "http://localhost:4200")
public class PublicQueryController
{
    @Autowired
    private PublicQueryService publicQueryService;

    @GetMapping(path = "/getRecentQueries")
    @CrossOrigin(methods = RequestMethod.GET, origins = "/forum")
    public ResponseEntity<Collection<PublicQuery>> getRecentQueries()
    {
        return ResponseEntity.ok().body(this.publicQueryService.getRecentQueries());
    }

    @GetMapping(path = "/{username}/getRecentQueries")
    @CrossOrigin(methods = RequestMethod.GET, origins = "/user/*")
    public ResponseEntity<Collection<PublicQuery>> getRecentQueriesForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.publicQueryService.getRecentQueriesForUser(username));
    }

    @GetMapping(path = "/{username}/getRecentResponses")
    @CrossOrigin(methods = RequestMethod.GET, origins = "/user/*")
    public ResponseEntity<Collection<PublicQuery>> getRecentResponsesForUser(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.publicQueryService.getRecentResponsesForUser(username));
    }

    @PostMapping(path = "/{username}/createQuery")
    @CrossOrigin(methods = RequestMethod.POST, origins = "/forum")
    public ResponseEntity<Query> createQuery(@RequestBody PublicQuery query, @PathVariable String username)
    {
        return ResponseEntity.ok().body(this.publicQueryService.createQuery(query, username));
    }
}
