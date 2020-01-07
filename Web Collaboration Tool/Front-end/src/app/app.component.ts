import { Component } from '@angular/core';
import {RedirectService} from './auxiliary-module/services/redirect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-end';

  constructor(private redirectService: RedirectService) {
  }

  public getLocalStorage(): Storage {
    return localStorage;
  }

  public logout() {
    localStorage.clear();
    this.redirectService.redirect('/');
  }
}
