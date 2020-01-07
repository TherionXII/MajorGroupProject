import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPageComponent} from './user-page/user-page.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';

const routes: Routes = [
  { path: 'user/:username', component: UserPageComponent },
  { path: 'settings', component: UserSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFeatureRoutingModule { }
