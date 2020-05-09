import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import {HomePageComponent} from './Components/home-page/home-page.component';
import {SignUpComponent} from './Components/sign-up/sign-up.component';
import {FooterComponent} from './PartialComponents/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { NotificationComponent } from './PartialComponents/notification/notification.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ChatComponent} from './PartialComponents/chat/chat.component';
import { MandatorySignUpComponent } from './PartialComponents/mandatory-sign-up/mandatory-sign-up.component';
import {MatStepperModule} from '@angular/material/stepper';
import { OptionalSignUpComponent } from './PartialComponents/optional-sign-up/optional-sign-up.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SignUpComponent,
    FooterComponent,
    NotificationComponent,
    ChatComponent,
    MandatorySignUpComponent,
    OptionalSignUpComponent
  ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        UtilityRoutingModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        SimpleNotificationsModule,
        MatStepperModule,
    ],
  exports: [
    FooterComponent,
    NotificationComponent,
    ChatComponent
  ]
})
export class UtilityModule { }
