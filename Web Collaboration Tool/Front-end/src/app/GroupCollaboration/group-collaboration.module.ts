import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupCollaborationRoutingModule } from './group-collaboration-routing.module';
import {GroupCollaborationHomeComponent} from './Components/group-collaboration-home/group-collaboration-home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { GroupComponent } from './Components/group/group.component';
import {MatListModule} from '@angular/material/list';
import { GroupManagementComponent } from './PartialComponents/group-management/group-management.component';
import {UtilityModule} from '../Utility/utility.module';


@NgModule({
  declarations: [
    GroupCollaborationHomeComponent,
    GroupComponent,
    GroupManagementComponent
  ],
  imports: [
    CommonModule,
    GroupCollaborationRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    UtilityModule
  ]
})
export class GroupCollaborationModule { }
