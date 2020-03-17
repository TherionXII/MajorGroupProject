package project.webcollaborationtool.Collaboration.Thread.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Thread.Entities.Message;
import project.webcollaborationtool.Collaboration.Thread.Entities.PrivateCollaborationThread;
import project.webcollaborationtool.Collaboration.Thread.Repositories.ChatThreadRepository;
import project.webcollaborationtool.Collaboration.Thread.Repositories.MessageRepository;
import project.webcollaborationtool.Utility.CompositeKeys.PrivateCollaborationId;

import java.util.Collection;

@Service
public class ThreadService
{
    @Autowired
    private PrivateCollaborationRepository privateCollaborationRepository;

    @Autowired
    private ChatThreadRepository chatThreadRepository;

    @Autowired
    private MessageRepository messageRepository;

    public Integer createPrivateThread(String collaboratorOne, String collaboratorTwo)
    {
        var privateCollaboration = this.privateCollaborationRepository.existsById(new PrivateCollaborationId(collaboratorOne, collaboratorTwo)) ?
                                   this.privateCollaborationRepository.findById(new PrivateCollaborationId(collaboratorOne, collaboratorTwo)) :
                                   this.privateCollaborationRepository.findById(new PrivateCollaborationId(collaboratorTwo, collaboratorOne));

        if(privateCollaboration.orElseThrow().getThread() != null) return privateCollaboration.orElseThrow().getThread().getId();

        var thread = new PrivateCollaborationThread();
        thread.setPrivateCollaboration(privateCollaboration.orElseThrow());
        thread = this.chatThreadRepository.save(thread);

        privateCollaboration.orElseThrow().setThread(thread);
        privateCollaborationRepository.save(privateCollaboration.orElseThrow());

        return thread.getId();
    }

    public Collection<Message> getMessagesForThread(Integer threadId)
    {
        return this.chatThreadRepository.findById(threadId).orElseThrow().getMessages();
    }

    public void addMessage(Message message, Integer threadId)
    {
        var thread = this.chatThreadRepository.findById(threadId).orElseThrow();

        message.setThread(thread);
        message = this.messageRepository.save(message);

        thread.setLastMessage(message);
        this.chatThreadRepository.save(thread);
    }
}
