import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './Components/user/user.component';
import {UserSettingsComponent} from './Components/user-settings/user-settings.component';

import {PrivateCollaborationStatusResolverService} from './Resolvers/private-collaboration-status-resolver.service';
import {UserDataResolverService} from './Resolvers/user-data-resolver.service';
import {UserNotificationsComponent} from './Components/user-notifications/user-notifications.component';
import {UserNotificationResolverService} from '../Utility/Resolvers/UserNotificationResolvers/user-notification-resolver.service';
import {UserProfileResolverService} from './Resolvers/user-profile-resolver.service';

const routes: Routes = [
  {
    path: 'user/:username',
    component: UserComponent,
    resolve: {
        userData: UserDataResolverService,
        collaborationStatus: PrivateCollaborationStatusResolverService
    }
  },
  { path: 'notifications', component: UserNotificationsComponent, resolve: { notifications: UserNotificationResolverService } },
  { path: 'settings', component: UserSettingsComponent, resolve: { userProfile: UserProfileResolverService} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
