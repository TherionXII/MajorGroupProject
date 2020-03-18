import { NgModule } from '@angular/core';

import { UtilityModule } from './Utility/utility.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { QueryModule } from './Query/query.module';
import { UserModule } from './User/user.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HomePageComponent } from './Utility/Components/home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import {AuthenticationGuard} from './Utility/Guards/authentication.guard';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {SocketConfigurationConfig} from './Utility/HelperClasses/SocketConfiguration.config';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {PrivateCollaborationModule} from './PrivateCollaboration/private-collaboration.module';

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
    UtilityModule,
    UserModule,
    QueryModule,
    PrivateCollaborationModule,
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
