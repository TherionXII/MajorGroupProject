import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPageComponent} from './user-page/user-page.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {ProfileResolverService} from '../Utility/Resolvers/profile-resolver.service';
import {UserQueryResolverService} from '../Utility/Resolvers/user-query-resolver.service';
import {UserResponseResolverService} from '../Utility/Resolvers/user-response-resolver.service';

const routes: Routes = [
  {
    path: 'user/:username',
    component: UserPageComponent,
    resolve: {
        userProfile: ProfileResolverService,
        queries: UserQueryResolverService,
        responses: UserResponseResolverService
    }
  },
  { path: 'settings', component: UserSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFeatureRoutingModule { }
