import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Front-end';

  public username: string;

  constructor(private router: Router) {
    this.username = localStorage.getItem('username');
  }

  public logout(): void {
    localStorage.clear();

    this.username = null;

    this.router.navigateByUrl('/logout');
  }
}
