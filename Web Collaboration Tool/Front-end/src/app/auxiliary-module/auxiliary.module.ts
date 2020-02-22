import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuxiliaryRoutingModule } from './auxiliary-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {FooterComponent} from './footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { NotificationComponent } from './notification/notification.component';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  declarations: [
    HomePageComponent,
    SignUpComponent,
    FooterComponent,
    NotificationComponent
  ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        AuxiliaryRoutingModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        SimpleNotificationsModule,
    ],
  exports: [
    FooterComponent,
    NotificationComponent
  ]
})
export class AuxiliaryModule { }
