import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorMethods} from '../../../Utility/HelperClasses/ValidatorMethods';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './user-account-settings.component.html',
  styleUrls: ['./user-account-settings.component.css']
})
export class UserAccountSettingsComponent implements OnInit {
  public emailSettingsForm: FormGroup;
  public passwordSettingsForm: FormGroup;

  public resultMessage: string;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.emailSettingsForm = new FormGroup({
      email: new FormControl('', Validators.email)
    });

    this.passwordSettingsForm = new FormGroup({
      password: new FormControl('', Validators.minLength(8)),
      repeatPassword: new FormControl('', Validators.minLength(8))
    }, ValidatorMethods.getPasswordEqualValidator);
  }

  public isUpdatePasswordButtonDisabled(): boolean {
    return this.passwordSettingsForm.get('password').value === '';
  }

  public isUpdateEmailButtonDisabled(): boolean {
    return this.emailSettingsForm.get('email').value === '';
  }

  public onUpdatePassword(): void {
    this.userService.updateUserPassword(localStorage.getItem('username'), this.passwordSettingsForm.get('password').value)
      .subscribe(() => this.resultMessage = 'Password updated successfully!', error => this.resultMessage = error.message);
  }

  public onUpdateEmail(): void {
    this.userService.updateUserEmail(localStorage.getItem('username'), this.emailSettingsForm.get('email').value)
      .subscribe(() => this.resultMessage = 'Email updated successfully!', error => this.resultMessage = error.message);
  }
}
