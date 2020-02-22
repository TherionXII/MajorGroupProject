package project.webcollaborationtool.Collaboration.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Utility.Entities.UserCollaborationMessage;
import project.webcollaborationtool.Utility.Repositories.CollaborationMessageRepository;

import javax.validation.constraints.NotNull;

@Service
public class PrivateCollaborationService
{
    @Autowired
    private MessageSendingOperations<String> messageSendingOperations;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CollaborationMessageRepository collaborationMessageRepository;

    public void createPrivateCollaborationRequest(@NotNull UserCollaborationMessage userCollaborationMessage) throws Exception
    {
        this.collaborationMessageRepository.save(userCollaborationMessage);

        this.messageSendingOperations.convertAndSend("/topic/user/collaboration/request/" + userCollaborationMessage.getRecipient(),
                                                        this.objectMapper.writeValueAsString(userCollaborationMessage));
    }
}
