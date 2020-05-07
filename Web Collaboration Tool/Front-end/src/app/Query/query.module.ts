import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ForumComponent} from './Components/forum/forum.component';
import {QueryComponent} from './Components/query/query.component';
import {QueryContainerComponent} from './PartialComponents/query-container/query-container.component';
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
import { ForumQueriesComponent } from './PartialComponents/forum-queries/forum-queries.component';
import { QueryCreationComponent } from './PartialComponents/query-creation/query-creation.component';
import { QueryVoteComponent } from './PartialComponents/query-vote/query-vote.component';


@NgModule({
  declarations: [
    ForumComponent,
    QueryComponent,
    QueryContainerComponent,
    ForumQueriesComponent,
    QueryCreationComponent,
    QueryVoteComponent
  ],
  exports: [
    ForumComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    QueryRoutingModule,
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
export class QueryModule { }
