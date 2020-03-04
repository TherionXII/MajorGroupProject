import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateCollaborationsRoutingModule } from './private-collaborations-routing.module';
import { PrivateCollaborationsPageComponent } from './private-collaborations-page/private-collaborations-page.component';


@NgModule({
  declarations: [PrivateCollaborationsPageComponent],
  imports: [
    CommonModule,
    PrivateCollaborationsRoutingModule
  ]
})
export class PrivateCollaborationsModule { }
