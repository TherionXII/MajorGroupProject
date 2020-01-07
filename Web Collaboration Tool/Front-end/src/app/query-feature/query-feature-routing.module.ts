import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumComponent} from './forum/forum.component';
import {QueryComponent} from './query/query.component';

const routes: Routes = [
  { path: 'forum', component: ForumComponent },
  { path: 'query/:id', component: QueryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryFeatureRoutingModule { }
