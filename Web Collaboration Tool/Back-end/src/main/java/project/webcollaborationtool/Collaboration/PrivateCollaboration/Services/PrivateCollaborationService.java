package project.webcollaborationtool.Collaboration.PrivateCollaboration.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.User.Repositories.UserRepository;
import project.webcollaborationtool.Utility.CompositeKeys.PrivateCollaborationId;

import java.util.Collection;

@Service
@Transactional
public class PrivateCollaborationService
{
    @Autowired
    private PrivateCollaborationRepository privateCollaborationRepository;

    @Autowired
    private UserRepository userRepository;

    public void createPrivateCollaboration(PrivateCollaborationRequest privateCollaborationRequest)
    {
        var collaboration = new PrivateCollaboration();
        collaboration.setCollaboratorOneUsername(privateCollaborationRequest.getRecipient());
        collaboration.setCollaboratorTwoUsername(privateCollaborationRequest.getSender());

        collaboration.setFirstCollaborator(this.userRepository.findByUsername(privateCollaborationRequest.getRecipient()));
        collaboration.setSecondCollaborator(this.userRepository.findByUsername(privateCollaborationRequest.getSender()));

        this.privateCollaborationRepository.save(collaboration);
    }

    public boolean isCollaborating(String firstUsername, String secondUsername)
    {
        return this.privateCollaborationRepository.existsById(new PrivateCollaborationId(firstUsername, secondUsername)) ||
               this.privateCollaborationRepository.existsById(new PrivateCollaborationId(secondUsername, firstUsername));
    }

    public Collection<PrivateCollaboration> getAllPrivateCollaborationsForUser(String username)
    {
        return this.privateCollaborationRepository.findAllByCollaboratorOneUsernameOrCollaboratorTwoUsername(username, username);
    }
}
