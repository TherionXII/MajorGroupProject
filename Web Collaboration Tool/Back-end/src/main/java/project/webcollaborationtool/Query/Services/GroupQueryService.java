package project.webcollaborationtool.Query.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.webcollaborationtool.Collaboration.GroupCollaboration.Respositories.GroupCollaborationRepository;
import project.webcollaborationtool.Query.Entities.GroupQuery;
import project.webcollaborationtool.Query.Repositories.GroupQueryRepository;

import java.util.Collection;

@Service
public class GroupQueryService
{
    @Autowired
    private GroupQueryRepository groupQueryRepository;

    @Autowired
    private GroupCollaborationRepository groupCollaborationRepository;

    public GroupQuery createQuery(GroupQuery query, String username, Integer groupId)
    {
        query.setUsername(username);
        query.setRating(0);
        query.setGroupCollaboration(this.groupCollaborationRepository.findById(groupId).orElseThrow());

        return this.groupQueryRepository.save(query);
    }

    public Collection<GroupQuery> getRecentQueries(Integer groupId)
    {
        return this.groupQueryRepository.findTop10ByGroupCollaborationOrderByCreatedAtDesc(this.groupCollaborationRepository.findById(groupId).orElseThrow());
    }
}
