import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignUpService } from '../services/sign-up.service';
import { UserService } from '../../user-feature/Services/user.service';

import { IUser } from '../../user-feature/Interfaces/IUser';

import { ValidatorMethods } from '../../Utility/ValidatorMethods';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpFormRequiredData: FormGroup;
  public signUpFormOptionalData: FormGroup;

  public isInOptionalPart = false;

  public signUpError: string;

  constructor(private signUpService: SignUpService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.signUpFormRequiredData = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      repeatPassword: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      email: new FormControl('', [ Validators.required, Validators.email ])
    }, ValidatorMethods.getPasswordEqualValidator);

    this.signUpFormOptionalData = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      gender: new FormControl(''),
      institution: new FormControl('')
    });
  }

  public onRequiredDataSubmit() {
    this.signUpService.createUser(this.signUpFormRequiredData.value as IUser)
                      .subscribe(() => this.isInOptionalPart = true, error => this.signUpError = error.error);
  }

  public async onOptionalDataSubmit(): Promise<void> {
    try {
      await this.userService.updateUserProfile(this.signUpFormRequiredData.get('username').value, this.signUpFormOptionalData.getRawValue()).toPromise();

      localStorage.setItem('username', this.signUpFormRequiredData.get('username').value);
      this.router.navigateByUrl('/user/' + localStorage.getItem('username'));
    } catch (error) {
      localStorage.clear();
      this.signUpError = error.error;
    }
  }
}
