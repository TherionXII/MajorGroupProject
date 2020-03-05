import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateCollaborationsRoutingModule } from './private-collaborations-routing.module';
import { PrivateCollaborationsPageComponent } from './private-collaborations-page/private-collaborations-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { PrivateCollaborationChatComponent } from './private-collaboration-chat/private-collaboration-chat.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [PrivateCollaborationsPageComponent, PrivateCollaborationChatComponent],
  imports: [
    CommonModule,
    PrivateCollaborationsRoutingModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule
  ]
})
export class PrivateCollaborationsModule { }
