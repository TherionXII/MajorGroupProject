import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit() {}

  public click(): void {
    this.userService.create().subscribe(next => console.log(next), error => console.log(error));
  }
}
