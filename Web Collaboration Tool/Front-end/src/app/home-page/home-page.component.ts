import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {RedirectService} from '../services/redirect.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private userService: UserService,
              private redirectService: RedirectService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {
    this.userService.login(this.loginForm.getRawValue())
      .subscribe(next => this.redirectService.redirect('/user'), error => console.log(error));
  }

  public onSignUp(): void {
    this.redirectService.redirect('/signUp').catch(error => console.log(error));
  }
}
