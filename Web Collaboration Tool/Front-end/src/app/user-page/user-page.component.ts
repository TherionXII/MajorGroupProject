import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {IUserProfile} from '../Interfaces/IUserProfile';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public username: string;
  public userInformation: IUserProfile = {
    name: '',
    surname: '',
    gender: '',
    institution: ''
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUserProfile(this.route.snapshot.paramMap.get('username'))
      .subscribe(response => this.userInformation = response, error => console.log(error));
    this.username = localStorage.getItem('username');
  }
}
