import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPageComponent} from './Components/user-page/user-page.component';
import {UserSettingsComponent} from './Components/user-settings/user-settings.component';

import {PrivateCollaborationStatusResolverService} from '../Utility/Resolvers/UserPageResolvers/private-collaboration-status-resolver.service';
import {UserDataResolverService} from '../Utility/Resolvers/UserPageResolvers/user-data-resolver.service';
import {UserNotificationsComponent} from './Components/user-notifications/user-notifications.component';
import {UserNotificationResolverService} from '../Utility/Resolvers/UserNotificationResolvers/user-notification-resolver.service';

const routes: Routes = [
  {
    path: 'user/:username',
    component: UserPageComponent,
    resolve: {
        userData: UserDataResolverService,
        collaborationStatus: PrivateCollaborationStatusResolverService
    }
  },
  { path: 'notifications', component: UserNotificationsComponent, resolve: { notifications: UserNotificationResolverService } },
  { path: 'settings', component: UserSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
