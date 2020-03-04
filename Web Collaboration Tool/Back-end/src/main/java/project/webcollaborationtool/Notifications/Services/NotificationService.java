package project.webcollaborationtool.Notifications.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Entities.PrivateCollaborationNotification;
import project.webcollaborationtool.Notifications.Entities.PrivateNotification;
import project.webcollaborationtool.Notifications.Repositories.NotificationRepository;
import project.webcollaborationtool.Notifications.Repositories.PrivateNotificationRepository;
import project.webcollaborationtool.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.User.Repositories.UserRepository;

import java.util.Collection;

@Service
public class NotificationService
{
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private PrivateNotificationRepository privateNotificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageSendingOperations<String> messageSendingOperations;

    @Autowired
    private ObjectMapper objectMapper;

    public void addPrivateCollaborationRequestNotification(PrivateCollaborationRequest privateCollaborationRequest) throws Exception
    {
        var privateCollaborationNotification = new PrivateCollaborationNotification();
        privateCollaborationNotification.setTitle("You have a new collaboration request!");
        privateCollaborationNotification.setContent("User " + privateCollaborationRequest.getSender() + " sent you a collaboration request");
        privateCollaborationNotification.setRecipient(this.userRepository.findByUsername(privateCollaborationRequest.getRecipient()));
        privateCollaborationNotification.setSender(privateCollaborationRequest.getSender());

        this.notificationRepository.save(privateCollaborationNotification);

        this.messageSendingOperations.convertAndSend("/topic/user/collaboration/request/" + privateCollaborationNotification.getRecipient().getUsername(),
                                                      this.objectMapper.writeValueAsString(privateCollaborationNotification));
    }

    public void addPrivateCollaborationRequestResponseNotification(PrivateCollaborationRequest privateCollaborationRequest) throws Exception
    {
        var privateCollaborationNotification = new PrivateCollaborationNotification();
        privateCollaborationNotification.setTitle("A user responded to your collaboration request!");

        if(privateCollaborationRequest.getIsAccepted()) privateCollaborationNotification.setContent("User " + privateCollaborationRequest.getSender() + " has accepted your request.");
        else privateCollaborationNotification.setContent("User " + privateCollaborationRequest.getSender() + " has refused your request.");

        privateCollaborationNotification.setRecipient(this.userRepository.findByUsername(privateCollaborationRequest.getRecipient()));
        privateCollaborationNotification.setSender(privateCollaborationRequest.getSender());

        this.notificationRepository.save(privateCollaborationNotification);

        this.messageSendingOperations.convertAndSend("/topic/user/collaboration/request/" + privateCollaborationNotification.getRecipient().getUsername(),
                                                        this.objectMapper.writeValueAsString(privateCollaborationNotification));
    }

    public Collection<PrivateNotification> getNotifications(String username)
    {
        return this.privateNotificationRepository.findAllByRecipientOrderByCreatedAtDesc(this.userRepository.findByUsername(username));
    }
}
