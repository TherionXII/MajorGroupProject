import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFeatureRoutingModule } from './user-feature-routing.module';
import {UserPageComponent} from './user-page/user-page.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {ReactiveFormsModule} from '@angular/forms';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserCollaborationPaneComponent } from './PartialComponents/user-collaboration-pane/user-collaboration-pane.component';


@NgModule({
  declarations: [
    UserPageComponent,
    UserSettingsComponent,
    UserCollaborationPaneComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    UserFeatureRoutingModule,
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
export class UserFeatureModule { }
