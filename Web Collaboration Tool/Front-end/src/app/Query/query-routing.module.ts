import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumComponent} from './Components/forum/forum.component';
import {QueryComponent} from './Components/query/query.component';
import {ForumResolverService} from './Resolvers/forum-resolver.service';
import {QueryResolverService} from './Resolvers/query-resolver.service';

const routes: Routes = [
  { path: 'forum', component: ForumComponent, resolve: { forumData: ForumResolverService} },
  { path: 'query/:queryId', component: QueryComponent, resolve: { query: QueryResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule { }
