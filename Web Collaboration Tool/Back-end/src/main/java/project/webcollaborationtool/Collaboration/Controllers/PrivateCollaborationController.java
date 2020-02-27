package project.webcollaborationtool.Collaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import project.webcollaborationtool.Collaboration.Services.PrivateCollaborationService;
import project.webcollaborationtool.User.Services.UserService;
import project.webcollaborationtool.Utility.Entities.UserCollaborationNotification;

@Controller
public class PrivateCollaborationController
{
    @Autowired
    private PrivateCollaborationService privateCollaborationService;

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @MessageMapping("/user/collaboration/request")
    public String createCollaborationRequest(UserCollaborationNotification userCollaborationNotification) throws Exception
    {
        this.privateCollaborationService.createPrivateCollaborationRequest(userCollaborationNotification);
        this.userService.addNotification(userCollaborationNotification);

        return "OK";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @MessageMapping("/user/collaboration/response")
    public void submitCollaborationResponse(UserCollaborationNotification userCollaborationNotification) throws Exception
    {
        System.out.println(userCollaborationNotification);

        this.privateCollaborationService.submitCollaborationResponse(userCollaborationNotification);
        this.userService.addNotification(userCollaborationNotification);
    }

    @GetMapping("/isCollaborating/{firstUsername}/{secondUsername}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Boolean> isCollaborating(@PathVariable String firstUsername, @PathVariable String secondUsername)
    {
        return ResponseEntity.ok().body(this.privateCollaborationService.isCollaborating(firstUsername, secondUsername));
    }
}
