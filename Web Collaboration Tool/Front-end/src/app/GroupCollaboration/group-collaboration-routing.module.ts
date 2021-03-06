import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupCollaborationHomeComponent} from './Components/group-collaboration-home/group-collaboration-home.component';
import {GroupComponent} from './Components/group/group.component';
import {GroupCollaborationResolverService} from './Resolvers/group-collaboration-resolver.service';
import {GroupResolverService} from './Resolvers/group-resolver.service';
import {PrivateCollaborationResolverService} from '../PrivateCollaboration/Resolvers/private-collaboration-resolver.service';
import {ChatResolverService} from '../Utility/Resolvers/ThreadResolvers/chat-resolver.service';
import {GroupPapersResolverService} from './Resolvers/group-papers-resolver.service';
import {PaperComponent} from '../Paper/ExportComponents/paper/paper.component';
import {PaperResolverService} from './Resolvers/paper-resolver.service';
import {GroupForumResolverService} from './Resolvers/group-forum-resolver.service';

const routes: Routes = [
  {
    path: 'groups',
    component: GroupCollaborationHomeComponent,
    resolve: {
      userGroups: GroupCollaborationResolverService
    }
  },
  {
    path: 'group/:groupId/:threadId',
    component: GroupComponent,
    resolve: {
      groupData: GroupResolverService,
      privateCollaborations: PrivateCollaborationResolverService,
      chatData: ChatResolverService,
      forumData: GroupForumResolverService,
      papers: GroupPapersResolverService
    }
  },
  {path: 'paper/:paperId', component: PaperComponent, resolve: {paper: PaperResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupCollaborationRoutingModule {
}
