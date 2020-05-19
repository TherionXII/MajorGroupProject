package project.webcollaborationtool.Collaboration.Thread.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Entities.GroupCollaboration;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.GroupCollaborationThread;
import project.webcollaborationtool.Collaboration.Thread.Entities.Message;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
import project.webcollaborationtool.Collaboration.Thread.Exceptions.InvalidThreadDataException;
import project.webcollaborationtool.Collaboration.Thread.Repositories.ChatThreadRepository;
import project.webcollaborationtool.Collaboration.Thread.Repositories.MessageRepository;
import project.webcollaborationtool.Utility.CompositeKeys.PrivateCollaborationId;

import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional
public class ThreadService
{
    @Autowired
    private PrivateCollaborationRepository privateCollaborationRepository;

    @Autowired
    private ChatThreadRepository chatThreadRepository;

    public Integer createPrivateThread(String firstCollaborator, String secondCollaborator)
    {
        var privateCollaboration = this.privateCollaborationRepository.findByFirstCollaboratorAndSecondCollaborator(firstCollaborator, secondCollaborator);
        privateCollaboration.setThread(new PrivateCollaborationThread());
        privateCollaboration.getThread().setMessages(new ArrayList<>());

        var privateCollaborationInverse = this.privateCollaborationRepository.findByFirstCollaboratorAndSecondCollaborator(secondCollaborator, firstCollaborator);
        privateCollaborationInverse.setThread(privateCollaboration.getThread());

        this.privateCollaborationRepository.save(privateCollaborationInverse);

        return this.privateCollaborationRepository.save(privateCollaboration).getThread().getId();
    }

    public Collection<Message> getMessagesForThread(Integer threadId)
    {
        return this.chatThreadRepository.findById(threadId).orElseThrow(InvalidThreadDataException::new).getMessages();
    }

    public void addMessage(Message message, Integer threadId)
    {
        var thread = this.chatThreadRepository.findById(threadId).orElseThrow(InvalidThreadDataException::new);
        thread.setLastMessage(message);
        thread.getMessages().add(message);

        message.setThread(thread);

        this.chatThreadRepository.save(thread);
    }
}
