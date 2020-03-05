package project.webcollaborationtool.Collaboration.Thread.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Collaboration.Thread.Services.ThreadService;

@RestController
public class ThreadController
{
    @Autowired
    private ThreadService threadService;

    @GetMapping("/createPrivateThread/{collaboratorOne}/{collaboratorTwo}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Integer> createPrivateThread(@PathVariable String collaboratorOne, @PathVariable String collaboratorTwo)
    {
        return ResponseEntity.ok().body(this.threadService.createPrivateThread(collaboratorOne, collaboratorTwo));
    }
}
