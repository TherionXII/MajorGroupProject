package project.webcollaborationtool.Notifications.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import project.webcollaborationtool.Notifications.Entities.PrivateNotification;
import project.webcollaborationtool.Notifications.Services.NotificationService;

import java.util.Collection;

@Controller
public class NotificationController
{
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/getNotifications/{username}")
    @CrossOrigin(origins = "http://localhost:4200", methods = RequestMethod.GET)
    public ResponseEntity<Collection<PrivateNotification>> getNotifications(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.notificationService.getNotifications(username));
    }
}
