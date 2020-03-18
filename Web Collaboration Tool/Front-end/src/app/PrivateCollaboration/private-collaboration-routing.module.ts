import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivateCollaborationsPageComponent} from './Components/private-collaborations-page/private-collaborations-page.component';
import {PrivateCollaborationResolverService} from '../Utility/Resolvers/PrivateCollaborationPageResolvers/private-collaboration-resolver.service';
import {PrivateCollaborationChatComponent} from './Components/private-collaboration-chat/private-collaboration-chat.component';
import {PrivateCollaborationChatResolverService} from '../Utility/Resolvers/PrivateCollaborationPageResolvers/private-collaboration-chat-resolver.service';
import {PrivateCollaborationRequestResolverService} from '../Utility/Resolvers/PrivateCollaborationPageResolvers/private-collaboration-request-resolver.service';

const routes: Routes = [
  {
    path: 'collaborations',
    component: PrivateCollaborationsPageComponent,
    resolve: {
      privateCollaborations: PrivateCollaborationResolverService,
      requests: PrivateCollaborationRequestResolverService
    }
  },
  { path: 'thread/:id', component: PrivateCollaborationChatComponent, resolve: { messages: PrivateCollaborationChatResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateCollaborationRoutingModule { }
