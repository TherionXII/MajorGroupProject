import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {RedirectService} from '../services/redirect.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(private userService: UserService,
              private redirectService: RedirectService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      repeatPassword: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      email: new FormControl('', [ Validators.required, Validators.email ])
    }, this.validatePassword);
  }

  public onSubmit() {
    this.userService.create(this.signUpForm.getRawValue())
      .subscribe(() => this.redirectService.redirect('/user'), error => console.log(error));
  }

  public validatePassword(formGroup: FormGroup) {
    console.log(formGroup.get('password').value === formGroup.get('repeatPassword').value);

    return formGroup.get('password').value === formGroup.get('repeatPassword').value
      ? null : {
        validatePassword: {
            valid: false
        }
    };
  }
}
