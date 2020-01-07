import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryFeatureRoutingModule } from './query-feature-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ForumComponent} from './forum/forum.component';
import {QueryComponent} from './query/query.component';
import {QueryContainerComponent} from './query-container/query-container.component';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule,
  MatSidenavModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [
    ForumComponent,
    QueryComponent,
    QueryContainerComponent
  ],
  imports: [
    CommonModule,
    QueryFeatureRoutingModule,
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
export class QueryFeatureModule { }
