import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from './Components/user/user.component';
import {UserSettingsComponent} from './Components/user-settings/user-settings.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserCollaborationPaneComponent } from './PartialComponents/user-collaboration-pane/user-collaboration-pane.component';
import { UserNotificationsComponent } from './Components/user-notifications/user-notifications.component';
import { RecentUserQueriesComponent } from './PartialComponents/recent-user-queries/recent-user-queries.component';
import { RecentUserResponsesComponent } from './PartialComponents/recent-user-responses/recent-user-responses.component';
import { UserAccountSettingsComponent } from './PartialComponents/user-account-settings/user-account-settings.component';
import { UserProfileSettingsComponent } from './PartialComponents/user-profile-settings/user-profile-settings.component';


@NgModule({
  declarations: [
    UserComponent,
    UserSettingsComponent,
    UserCollaborationPaneComponent,
    UserNotificationsComponent,
    RecentUserQueriesComponent,
    RecentUserResponsesComponent,
    UserAccountSettingsComponent,
    UserProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
