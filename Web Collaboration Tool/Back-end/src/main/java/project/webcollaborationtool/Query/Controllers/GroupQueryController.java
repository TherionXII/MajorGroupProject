package project.webcollaborationtool.Query.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Query.Entities.GroupQuery;
import project.webcollaborationtool.Query.Services.GroupQueryService;

import java.util.Collection;

@RestController
@RequestMapping("/api/queries/groupQueries")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupQueryController
{
    @Autowired
    private GroupQueryService groupQueryService;

    @PostMapping("/{username}/{groupId}/createQuery")
    @CrossOrigin(origins = "/group/*", methods = RequestMethod.POST)
    public ResponseEntity<GroupQuery> createQuery(@RequestBody GroupQuery query, @PathVariable String username, @PathVariable Integer groupId)
    {
        return ResponseEntity.ok().body(this.groupQueryService.createQuery(query, username, groupId));
    }

    @GetMapping("/{groupId}/getRecentQueries")
    @CrossOrigin(origins = "/group/*", methods = RequestMethod.GET)
    public ResponseEntity<Collection<GroupQuery>> getRecentQueries(@PathVariable Integer groupId)
    {
        return ResponseEntity.ok().body(this.groupQueryService.getRecentQueries(groupId));
    }
}
