package project.webcollaborationtool.Collaboration.PrivateCollaboration.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Entities.PrivateCollaboration;
import project.webcollaborationtool.Collaboration.PrivateCollaboration.Repositories.PrivateCollaborationRepository;
import project.webcollaborationtool.Collaboration.Request.Entities.PrivateCollaborationRequest;
import project.webcollaborationtool.User.Repositories.UserRepository;
import project.webcollaborationtool.Utility.CompositeKeys.PrivateCollaborationId;

import java.util.ArrayList;
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
        collaboration.setFirstCollaborator(privateCollaborationRequest.getRecipient());
        collaboration.setSecondCollaborator(privateCollaborationRequest.getSender());
        collaboration.setUser(this.userRepository.findByUsername(privateCollaborationRequest.getRecipient()));

        this.privateCollaborationRepository.save(collaboration);

        var collaborationInverse = new PrivateCollaboration();
        collaborationInverse.setFirstCollaborator(privateCollaborationRequest.getSender());
        collaborationInverse.setSecondCollaborator(privateCollaborationRequest.getRecipient());
        collaboration.setUser(this.userRepository.findByUsername(privateCollaborationRequest.getSender()));

        this.privateCollaborationRepository.save(collaborationInverse);
    }

    public boolean isCollaborating(String firstUsername, String secondUsername)
    {
        return this.privateCollaborationRepository.existsById(new PrivateCollaborationId(firstUsername, secondUsername));
    }

    public Collection<PrivateCollaboration> getAllPrivateCollaborationsForUser(String username)
    {
        return this.privateCollaborationRepository.findAllByFirstCollaborator(username);
    }

    public Collection<String> searchForUsers(String username)
    {
        var result = new ArrayList<String>();

        for(var user : this.userRepository.findAll())
            if(user.getUsername().toLowerCase().matches(".*" + username.toLowerCase() + ".*"))
                result.add(user.getUsername());

        return result;
    }
}
