import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../Services/user.service';
import {ActivatedRoute} from '@angular/router';
import {IUserProfile} from '../../Interfaces/IUserProfile';

@Component({
  selector: 'app-user-profile-settings',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent implements OnInit {
  public profileSettingsFormGroup: FormGroup;

  public resultMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.resultMessage = '';
  }

  public ngOnInit(): void {
    this.profileSettingsFormGroup = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      gender: new FormControl(''),
      institution: new FormControl('')
    });

    this.activatedRoute.data
      .subscribe((data: { userProfile: IUserProfile }) => this.profileSettingsFormGroup.patchValue(data.userProfile),
                 error => this.resultMessage = error);
  }

  public isUpdateProfileButtonDisabled(): boolean {
    return this.profileSettingsFormGroup.get('name').value === '' &&
      this.profileSettingsFormGroup.get('surname').value === '' &&
      this.profileSettingsFormGroup.get('gender').value === '' &&
      this.profileSettingsFormGroup.get('institution').value === '';
  }

  public onUpdateProfile(): void {
    this.userService.updateUserProfile(localStorage.getItem('username'), this.profileSettingsFormGroup.getRawValue())
      .subscribe(() => this.resultMessage = 'Profile updated successfully!', error => this.resultMessage = error.message);
  }
}
