import { NgModule } from '@angular/core';

import { AuxiliaryModule } from './auxiliary-module/auxiliary.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { QueryFeatureModule } from './query-feature/query-feature.module';
import { UserFeatureModule } from './user-feature/user-feature.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HomePageComponent } from './auxiliary-module/home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import {AuthenticationGuard} from './Utility/Guards/authentication.guard';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {SocketConfigurationConfig} from './Utility/SocketConfiguration.config';
import {SimpleNotificationsModule} from 'angular2-notifications';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [ AuthenticationGuard ] }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AuxiliaryModule,
    UserFeatureModule,
    QueryFeatureModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    { provide: InjectableRxStompConfig, useValue: SocketConfigurationConfig },
    { provide: RxStompService, useFactory: rxStompServiceFactory, deps: [ InjectableRxStompConfig ]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
