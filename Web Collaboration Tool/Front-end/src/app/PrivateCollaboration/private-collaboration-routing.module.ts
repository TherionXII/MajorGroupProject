import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivateCollaborationsHomeComponent} from './Components/private-collaborations-home/private-collaborations-home.component';
import {PrivateCollaborationResolverService} from './Resolvers/private-collaboration-resolver.service';
import {ChatComponent} from '../Utility/PartialComponents/chat/chat.component';
import {ChatResolverService} from '../Utility/Resolvers/ThreadResolvers/chat-resolver.service';
import {PrivateCollaborationRequestResolverService} from './Resolvers/private-collaboration-request-resolver.service';

const routes: Routes = [
  {
    path: 'collaborations',
    component: PrivateCollaborationsHomeComponent,
    resolve: {
      privateCollaborations: PrivateCollaborationResolverService,
      requests: PrivateCollaborationRequestResolverService
    }
  },
  { path: 'thread/:threadId', component: ChatComponent, resolve: { chatData: ChatResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateCollaborationRoutingModule { }
