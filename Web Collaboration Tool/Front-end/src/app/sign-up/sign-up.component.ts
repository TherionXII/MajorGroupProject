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
  public signUpFormRequiredData: FormGroup;
  public signUpFormOptionalData: FormGroup;

  public isInOptionalPart = false;

  constructor(private userService: UserService,
              private redirectService: RedirectService) { }

  ngOnInit() {
    this.signUpFormRequiredData = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      repeatPassword: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      email: new FormControl('', [ Validators.required, Validators.email ])
    }, this.validatePassword);

    this.signUpFormOptionalData = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      gender: new FormControl(''),
      institution: new FormControl('')
    });
  }

  public onRequiredDataSubmit() {
    this.userService.createUser(this.signUpFormRequiredData.getRawValue())
      .subscribe(() => this.isInOptionalPart = true, error => console.log(error));
  }

  public onOptionalDataSubmit() {
    this.userService.createUserInformation(this.signUpFormRequiredData.get('username').value, this.signUpFormOptionalData.getRawValue())
      .subscribe(() => {
        localStorage.setItem('username', this.signUpFormRequiredData.get('username').value);
        this.redirectService.redirect('/user');
      }, error => console.log(error));
  }

  public validatePassword(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('repeatPassword').value
      ? null : {
        validatePassword: {
            valid: false
        }
    };
  }
}
