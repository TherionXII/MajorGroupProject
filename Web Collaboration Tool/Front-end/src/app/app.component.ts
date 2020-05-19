import {Component, OnChanges, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Front-end';

  constructor(private router: Router) {}

  public ngOnInit(): void {}

  public logout(): void {
    localStorage.removeItem('username');

    this.router.navigateByUrl('/');
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }
}
