import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupCollaborationHomeComponent} from './Components/group-collaboration-home/group-collaboration-home.component';
import {GroupComponent} from './Components/group/group.component';
import {GroupCollaborationResolverService} from '../Utility/Resolvers/GroupCollaborationResolvers/group-collaboration-resolver.service';
import {GroupResolverService} from '../Utility/Resolvers/GroupCollaborationResolvers/group-resolver.service';
import {PrivateCollaborationResolverService} from '../Utility/Resolvers/PrivateCollaborationResolvers/private-collaboration-resolver.service';
import {ChatResolverService} from '../Utility/Resolvers/ThreadResolvers/chat-resolver.service';

const routes: Routes = [
  {
    path: 'groups',
    component: GroupCollaborationHomeComponent,
    resolve: {
      userGroups: GroupCollaborationResolverService
    }
  },
  {
    path: 'group/:id/:threadId',
    component: GroupComponent,
    resolve: {
      groupData: GroupResolverService,
      privateCollaborations: PrivateCollaborationResolverService,
      chatData: ChatResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupCollaborationRoutingModule { }
