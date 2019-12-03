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
    SignUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    RedirectService,
    UserService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
