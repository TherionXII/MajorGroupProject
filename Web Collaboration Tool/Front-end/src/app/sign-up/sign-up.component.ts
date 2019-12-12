import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {RedirectService} from '../services/redirect.service';
import {ValidatorService} from '../services/validator.service';
import {IUser} from '../Interfaces/IUser';

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
              private redirectService: RedirectService,
              private validatorService: ValidatorService) { }

  ngOnInit() {
    this.signUpFormRequiredData = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      repeatPassword: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      email: new FormControl('', [ Validators.required, Validators.email ])
    }, this.validatorService.validatePassword);

    this.signUpFormOptionalData = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      gender: new FormControl(''),
      institution: new FormControl('')
    });
  }

  public onRequiredDataSubmit() {
    this.userService.createUser(this.signUpFormRequiredData.value as IUser)
      .subscribe(() => {
        this.userService.createUserProfile(this.signUpFormRequiredData.get('username').value, this.signUpFormOptionalData.getRawValue())
          .subscribe(() => this.isInOptionalPart = true);
      }, error => console.log(error));
  }

  public onOptionalDataSubmit() {
    this.userService.updateUserProfile(this.signUpFormRequiredData.get('username').value, this.signUpFormOptionalData.getRawValue())
      .subscribe(() => {
        localStorage.setItem('username', this.signUpFormRequiredData.get('username').value);
        this.redirectService.redirect('/user/' + localStorage.getItem('username'));
      }, error => console.log(error));
  }
}
