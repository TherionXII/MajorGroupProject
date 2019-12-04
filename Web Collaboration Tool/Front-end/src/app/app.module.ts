import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {UserService} from './services/user.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UserPageComponent } from './user-page/user-page.component';
import {RouterModule, Routes} from '@angular/router';
import {RedirectService} from './services/redirect.service';
import {ReactiveFormsModule} from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { FooterComponent } from './partialComponents/footer/footer.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'signUp', component: SignUpComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    SignUpComponent,
    FooterComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  providers: [
    RedirectService,
    UserService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
