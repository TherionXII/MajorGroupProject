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
  public signUpFormGroup: FormGroup;

  constructor(private userService: UserService,
              private redirectService: RedirectService) {}

  ngOnInit() {
    this.signUpFormGroup = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {
    this.userService.create(this.signUpFormGroup.getRawValue())
      .subscribe(next => this.redirectService.redirect('/user'), error => console.log(error));
  }
}
