package project.webcollaborationtool.Collaboration.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.webcollaborationtool.Collaboration.Entities.UserToUserCollaboration;
import project.webcollaborationtool.Collaboration.Repositories.UserToUserCollaborationRepository;
import project.webcollaborationtool.User.Repositories.UserRepository;
import project.webcollaborationtool.Utility.CompositeKeys.UserToUserId;
import project.webcollaborationtool.Utility.Entities.UserCollaborationNotification;
import project.webcollaborationtool.Utility.Repositories.CollaborationMessageRepository;
import project.webcollaborationtool.Utility.Repositories.UserCollaborationMessageRepository;

import javax.validation.constraints.NotNull;

@Service
@Transactional
public class PrivateCollaborationService
{
    @Autowired
    private MessageSendingOperations<String> messageSendingOperations;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CollaborationMessageRepository collaborationMessageRepository;

    @Autowired
    private UserCollaborationMessageRepository userCollaborationMessageRepository;

    @Autowired
    private UserToUserCollaborationRepository userToUserCollaborationRepository;

    @Autowired
    private UserRepository userRepository;

    public void createPrivateCollaborationRequest(@NotNull UserCollaborationNotification userCollaborationNotification) throws Exception
    {
        this.collaborationMessageRepository.save(userCollaborationNotification);

        this.messageSendingOperations.convertAndSend("/topic/user/collaboration/request/" + userCollaborationNotification.getRecipient(),
                                                        this.objectMapper.writeValueAsString(userCollaborationNotification));
    }

    public void submitCollaborationResponse(UserCollaborationNotification userCollaborationNotification) throws Exception
    {
        this.userCollaborationMessageRepository.deleteBySenderAndRecipient(userCollaborationNotification.getRecipient(), userCollaborationNotification.getSender());
        this.userCollaborationMessageRepository.save(userCollaborationNotification);

        if(userCollaborationNotification.isAccepted()) this.createPrivateCollaboration(userCollaborationNotification);

        this.messageSendingOperations.convertAndSend("/topic/user/collaboration/response/" + userCollaborationNotification.getRecipient(),
                                                        this.objectMapper.writeValueAsString(userCollaborationNotification));
    }

    private void createPrivateCollaboration(UserCollaborationNotification userCollaborationNotification)
    {
        var collaboration = new UserToUserCollaboration();
        collaboration.setCollaboratorOneUsername(userCollaborationNotification.getRecipient());
        collaboration.setCollaboratorTwoUsername(userCollaborationNotification.getSender());
        collaboration.setFirstCollaborator(this.userRepository.findByUsername(userCollaborationNotification.getRecipient()));
        collaboration.setSecondCollaborator(this.userRepository.findByUsername(userCollaborationNotification.getSender()));

        this.userToUserCollaborationRepository.save(collaboration);
    }

    public boolean isCollaborating(String firstUsername, String secondUsername)
    {
        return this.userToUserCollaborationRepository.existsById(new UserToUserId(firstUsername, secondUsername)) ||
               this.userToUserCollaborationRepository.existsById(new UserToUserId(secondUsername, firstUsername));
    }
}
