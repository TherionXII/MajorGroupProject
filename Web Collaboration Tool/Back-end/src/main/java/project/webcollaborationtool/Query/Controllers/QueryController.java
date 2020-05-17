package project.webcollaborationtool.Query.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Query.Entities.Query;
import project.webcollaborationtool.Query.Entities.Response;
import project.webcollaborationtool.Query.Services.QueryService;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin(origins = "http://localhost:4200")
public class QueryController
{
    @Autowired
    private QueryService queryService;

    @GetMapping(path = "/{id}/getQuery")
    @CrossOrigin(methods = RequestMethod.GET, origins = { "/query/*" })
    public ResponseEntity<Query> getQueryById(@PathVariable int id)
    {
        return ResponseEntity.ok().body(this.queryService.getQueryById(id));
    }

    @PostMapping(path = "/{username}/{queryId}/createResponse")
    @CrossOrigin(methods = RequestMethod.POST, origins = "/query/*")
    public ResponseEntity<Query> createResponse(@RequestBody Response response, @PathVariable String username, @PathVariable Integer queryId)
    {
        return ResponseEntity.ok().body(this.queryService.createResponse(response, username, queryId));
    }
}