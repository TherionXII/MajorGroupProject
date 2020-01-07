import { NgModule } from '@angular/core';

import { AuxiliaryModuleModule } from './auxiliary-module/auxiliary-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { QueryFeatureModule } from './query-feature/query-feature.module';
import { UserFeatureModule } from './user-feature/user-feature.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './auxiliary-module/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }
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
    AuxiliaryModuleModule,
    UserFeatureModule,
    QueryFeatureModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
