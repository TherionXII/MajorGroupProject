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
  public accountSettingsFormGroup: FormGroup;
  public profileSettingsFormGroup: FormGroup;
  public privacySettingsFormGroup: FormGroup;

  public resultMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.accountSettingsFormGroup = new FormGroup({
      password: new FormControl('', Validators.minLength(8)),
      repeatPassword: new FormControl('', Validators.minLength(8)),
      email: new FormControl('', Validators.email)
    }, ValidatorMethods.getPasswordEqualValidator);

    this.profileSettingsFormGroup = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      gender: new FormControl(''),
      institution: new FormControl('')
    });

    this.userService.getUserProfile(localStorage.getItem('username'))
      .subscribe(profile => {
        this.profileSettingsFormGroup.get('name').setValue(profile.name);
        this.profileSettingsFormGroup.get('surname').setValue(profile.surname);
        this.profileSettingsFormGroup.get('gender').setValue(profile.gender);
        this.profileSettingsFormGroup.get('institution').setValue(profile.institution);
    });
  }

  public onTabChange() { this.resultMessage = ''; }

  public isUpdatePasswordDisabled(): boolean {
    return this.accountSettingsFormGroup.get('password').value === '';
  }

  public isUpdateEmailDisabled(): boolean {
    return this.accountSettingsFormGroup.get('email').value === '';
  }

  public isUpdateProfileDisabled(): boolean {
    return this.profileSettingsFormGroup.get('name').value === '' &&
           this.profileSettingsFormGroup.get('surname').value === '' &&
           this.profileSettingsFormGroup.get('gender').value === '' &&
           this.profileSettingsFormGroup.get('institution').value === '';
  }

  public onUpdatePassword(): void {
    this.userService.updateUserPassword(localStorage.getItem('username'), this.accountSettingsFormGroup.get('password').value)
      .subscribe(() => this.resultMessage = 'Password updated successfully!', error => console.log(error));
  }

  public onUpdateEmail(): void {
    this.userService.updateUserEmail(localStorage.getItem('username'), this.accountSettingsFormGroup.get('email').value)
      .subscribe(() => this.resultMessage = 'Email updated successfully!', error => console.log(error));
  }

  public onUpdateProfile(): void {
    this.userService.updateUserProfile(localStorage.getItem('username'), this.profileSettingsFormGroup.getRawValue())
      .subscribe(() => this.resultMessage = 'Profile updated successfully!', error => console.log(error));
  }
}
