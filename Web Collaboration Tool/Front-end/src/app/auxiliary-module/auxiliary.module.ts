import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuxiliaryRoutingModule } from './auxiliary-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {FooterComponent} from './footer/footer.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomePageComponent,
    SignUpComponent,
    FooterComponent
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
  ],
  exports: [
    FooterComponent
  ]
})
export class AuxiliaryModule { }
