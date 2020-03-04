import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'Front-end';

  constructor(private router: Router) {}

  public ngOnInit(): void {
    // this.logout();
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }

  public logout(): void {
    localStorage.clear();

    this.router.navigateByUrl('/');
  }
}
