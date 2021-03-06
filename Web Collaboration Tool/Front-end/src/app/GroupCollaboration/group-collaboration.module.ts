import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupCollaborationRoutingModule} from './group-collaboration-routing.module';
import {GroupCollaborationHomeComponent} from './Components/group-collaboration-home/group-collaboration-home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {GroupComponent} from './Components/group/group.component';
import {MatListModule} from '@angular/material/list';
import {GroupManagementComponent} from './PartialComponents/group-management/group-management.component';
import {UtilityModule} from '../Utility/utility.module';
import {QueryModule} from '../Query/query.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PaperModule} from '../Paper/paper.module';
import {UserGroupsComponent} from './PartialComponents/user-groups/user-groups.component';
import {GroupCreationComponent} from './PartialComponents/group-creation/group-creation.component';
import {GroupInvitationsComponent} from './PartialComponents/group-invitations/group-invitations.component';


@NgModule({
  declarations: [
    GroupCollaborationHomeComponent,
    GroupComponent,
    GroupManagementComponent,
    UserGroupsComponent,
    GroupCreationComponent,
    GroupInvitationsComponent
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
    UtilityModule,
    QueryModule,
    MatStepperModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ImageCropperModule,
    MaterialFileInputModule,
    MatCheckboxModule,
    PaperModule
  ]
})
export class GroupCollaborationModule {
}
