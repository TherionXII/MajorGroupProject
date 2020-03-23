import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateCollaborationRoutingModule } from './private-collaboration-routing.module';
import { PrivateCollaborationsPageComponent } from './Components/private-collaborations-page/private-collaborations-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { ChatComponent } from '../Utility/PartialComponents/chat/chat.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PrivateCollaborationsPageComponent, ChatComponent],
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
