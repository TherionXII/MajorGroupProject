import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateCollaborationRoutingModule } from './private-collaboration-routing.module';
import { PrivateCollaborationsHomeComponent } from './Components/private-collaborations-home/private-collaborations-home.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PrivateCollaborationChatsComponent } from './PartialComponents/private-collaboration-chats/private-collaboration-chats.component';
import { PrivateCollaborationChatCreationComponent } from './PartialComponents/private-collaboration-chat-creation/private-collaboration-chat-creation.component';
import { PrivateCollaborationRequestsComponent } from './PartialComponents/private-collaboration-requests/private-collaboration-requests.component';


@NgModule({
  declarations: [PrivateCollaborationsHomeComponent, PrivateCollaborationChatsComponent, PrivateCollaborationChatCreationComponent, PrivateCollaborationRequestsComponent],
  imports: [
    CommonModule,
    PrivateCollaborationRoutingModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrivateCollaborationModule { }
