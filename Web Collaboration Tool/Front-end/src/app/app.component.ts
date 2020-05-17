import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'Front-end';
  public username: string;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  public logout(): void {
    localStorage.clear();

    this.router.navigateByUrl('/');
  }
}
