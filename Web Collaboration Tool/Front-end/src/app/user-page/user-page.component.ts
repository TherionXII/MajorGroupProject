import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {IUserInformation} from '../Interfaces/IUserInformation';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public username: string;
  public userInformation: IUserInformation;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInformation(localStorage.getItem('username'))
      .subscribe(response => this.userInformation = response, error => console.log(error));
    this.username = localStorage.getItem('username');
  }
}
