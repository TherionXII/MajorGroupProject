package project.webcollaborationtool.Collaboration.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import project.webcollaborationtool.Collaboration.Services.PrivateCollaborationService;
import project.webcollaborationtool.User.Services.UserService;
import project.webcollaborationtool.Utility.Entities.UserCollaborationMessage;

@Controller
public class PrivateCollaborationController
{
    @Autowired
    private PrivateCollaborationService privateCollaborationService;

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @MessageMapping("/user/collaboration/request")
    public String createCollaborationRequest(UserCollaborationMessage userCollaborationMessage) throws Exception
    {
        this.privateCollaborationService.createPrivateCollaborationRequest(userCollaborationMessage);
        this.userService.addNotification(userCollaborationMessage);

        return "OK";
    }
}
