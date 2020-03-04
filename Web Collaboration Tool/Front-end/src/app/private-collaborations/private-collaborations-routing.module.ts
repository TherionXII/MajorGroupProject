import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivateCollaborationsPageComponent} from './private-collaborations-page/private-collaborations-page.component';


const routes: Routes = [
  { path: 'collaborations', component: PrivateCollaborationsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateCollaborationsRoutingModule { }
