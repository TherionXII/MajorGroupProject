import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {ValidatorMethods} from '../../../Utility/ValidatorMethods';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  public emailSettingsForm: FormGroup;
  public passwordSettingsForm: FormGroup;
  public profileSettingsFormGroup: FormGroup;

  public resultMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.emailSettingsForm = new FormGroup({
      email: new FormControl('', Validators.email)
    });

    this.passwordSettingsForm = new FormGroup({
      password: new FormControl('', Validators.minLength(8)),
      repeatPassword: new FormControl('', Validators.minLength(8))
    }, ValidatorMethods.getPasswordEqualValidator);

    this.profileSettingsFormGroup = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      gender: new FormControl(''),
      institution: new FormControl('')
    });

    this.userService.getUserProfile(localStorage.getItem('username'))
      .subscribe(profile => this.profileSettingsFormGroup.patchValue(profile), error => this.resultMessage = error.message);
  }

  public onTabChange() { this.resultMessage = ''; }

  public isUpdatePasswordButtonDisabled(): boolean {
    return this.passwordSettingsForm.get('password').value === '';
  }

  public isUpdateEmailButtonDisabled(): boolean {
    return this.emailSettingsForm.get('email').value === '';
  }

  public isUpdateProfileButtonDisabled(): boolean {
    return this.profileSettingsFormGroup.get('name').value === '' &&
           this.profileSettingsFormGroup.get('surname').value === '' &&
           this.profileSettingsFormGroup.get('gender').value === '' &&
           this.profileSettingsFormGroup.get('institution').value === '';
  }

  public onUpdatePassword(): void {
    this.userService.updateUserPassword(localStorage.getItem('username'), this.passwordSettingsForm.get('password').value)
      .subscribe(() => this.resultMessage = 'Password updated successfully!', error => this.resultMessage = error.message);
  }

  public onUpdateEmail(): void {
    this.userService.updateUserEmail(localStorage.getItem('username'), this.emailSettingsForm.get('email').value)
      .subscribe(() => this.resultMessage = 'Email updated successfully!', error => this.resultMessage = error.message);
  }

  public onUpdateProfile(): void {
    this.userService.updateUserProfile(localStorage.getItem('username'), this.profileSettingsFormGroup.getRawValue())
      .subscribe(() => this.resultMessage = 'Profile updated successfully!', error => this.resultMessage = error.message);
  }
}
