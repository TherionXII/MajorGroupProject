package project.webcollaborationtool.Notifications.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Exceptions.InvalidGroupDataException;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Notifications.Entities.GroupCollaborationNotification;
import project.webcollaborationtool.Notifications.Entities.Notification;
import project.webcollaborationtool.Notifications.Entities.PrivateCollaborationNotification;
import project.webcollaborationtool.Notifications.Entities.PrivateNotification;
import project.webcollaborationtool.Notifications.Repositories.NotificationRepository;
import project.webcollaborationtool.Notifications.Repositories.PrivateNotificationRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.GroupCollaborationRequest;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
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
    private GroupCollaborationRepository groupCollaborationRepository;

    public Notification addPrivateCollaborationRequestNotification(PrivateCollaborationRequest privateCollaborationRequest)
    {
        var privateCollaborationNotification = new PrivateCollaborationNotification();
        privateCollaborationNotification.setTitle("You have a new collaboration request!");
        privateCollaborationNotification.setContent("User " + privateCollaborationRequest.getSender() + " sent you a collaboration request");
        privateCollaborationNotification.setRecipient(this.userRepository.findByUsername(privateCollaborationRequest.getRecipient()));
        privateCollaborationNotification.setSender(privateCollaborationRequest.getSender());

        return this.notificationRepository.save(privateCollaborationNotification);
    }

    public Notification addPrivateCollaborationRequestResponseNotification(PrivateCollaborationRequest privateCollaborationRequest)
    {
        var privateCollaborationNotification = new PrivateCollaborationNotification();
        privateCollaborationNotification.setTitle("A user responded to your collaboration request!");

        if(privateCollaborationRequest.getIsAccepted())
            privateCollaborationNotification.setContent("User " + privateCollaborationRequest.getSender() + " has accepted your request.");
        else
            privateCollaborationNotification.setContent("User " + privateCollaborationRequest.getSender() + " has refused your request.");

        privateCollaborationNotification.setRecipient(this.userRepository.findByUsername(privateCollaborationRequest.getRecipient()));
        privateCollaborationNotification.setSender(privateCollaborationRequest.getSender());

        return this.notificationRepository.save(privateCollaborationNotification);
    }

    public Collection<PrivateNotification> getNotifications(String username)
    {
        return this.privateNotificationRepository.findAllByRecipientOrderByCreatedAtDesc(this.userRepository.findByUsername(username));
    }

    public Notification addGroupCollaborationRequest(GroupCollaborationRequest groupCollaborationRequest)
    {
        var groupCollaboration = this.groupCollaborationRepository.findById(groupCollaborationRequest.getGroupId()).orElseThrow(InvalidGroupDataException::new);

        var groupCollaborationNotification = new GroupCollaborationNotification();
        groupCollaborationNotification.setTitle("You have been invited to a collaboration group!");
        groupCollaborationNotification.setContent("You have been invited to group " + groupCollaboration.getTitle());
        groupCollaborationNotification.setRecipient(this.userRepository.findByUsername(groupCollaborationRequest.getRecipient()));
        groupCollaborationNotification.setGroupId(groupCollaborationRequest.getId());

        return this.notificationRepository.save(groupCollaborationNotification);
    }

    public Notification addGroupAdminPromotionNotification(Integer groupId, String username)
    {
        var groupCollaboration = this.groupCollaborationRepository.findById(groupId).orElseThrow(InvalidGroupDataException::new);

        var groupCollaborationNotification = new GroupCollaborationNotification();
        groupCollaborationNotification.setTitle("You have been made an administrator of a group!");
        groupCollaborationNotification.setContent("You can manage the group " + groupCollaboration.getTitle());
        groupCollaborationNotification.setRecipient(this.userRepository.findByUsername(username));
        groupCollaborationNotification.setGroupId(groupId);

        return this.notificationRepository.save(groupCollaborationNotification);
    }

    public Notification addGroupRemovalNotification(Integer groupId, String username)
    {
        var groupCollaboration = this.groupCollaborationRepository.findById(groupId).orElseThrow(InvalidGroupDataException::new);

        var groupCollaborationNotification = new GroupCollaborationNotification();
        groupCollaborationNotification.setTitle("You have been removed from a group!");
        groupCollaborationNotification.setContent("You can no longer access group " + groupCollaboration.getTitle());
        groupCollaborationNotification.setRecipient(this.userRepository.findByUsername(username));
        groupCollaborationNotification.setGroupId(groupId);

        return this.notificationRepository.save(groupCollaborationNotification);
    }
}
