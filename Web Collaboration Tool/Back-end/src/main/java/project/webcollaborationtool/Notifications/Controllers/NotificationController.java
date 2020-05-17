package project.webcollaborationtool.Notifications.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.webcollaborationtool.Notifications.Entities.PrivateNotification;
import project.webcollaborationtool.Notifications.Services.NotificationService;

import java.util.Collection;

@RestController
@RequestMapping("/api/notification/")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController
{
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{username}/getNotifications")
    @CrossOrigin(origins = "/notifications", methods = RequestMethod.GET)
    public ResponseEntity<Collection<PrivateNotification>> getNotifications(@PathVariable String username)
    {
        return ResponseEntity.ok().body(this.notificationService.getNotifications(username));
    }
}
