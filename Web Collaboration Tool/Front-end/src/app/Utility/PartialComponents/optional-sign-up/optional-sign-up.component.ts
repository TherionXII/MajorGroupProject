import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../User/Services/user.service';
import {Router} from '@angular/router';
import {IUserProfile} from '../../../User/Interfaces/IUserProfile';

@Component({
  selector: 'app-optional-sign-up',
  templateUrl: './optional-sign-up.component.html',
  styleUrls: ['./optional-sign-up.component.css']
})
export class OptionalSignUpComponent implements OnInit {
  public signUpFormOptionalData: FormGroup;

  public signUpError: string;

  constructor(private userService: UserService, private router: Router) {
    this.signUpError = '';
  }

  public ngOnInit(): void {
    this.signUpFormOptionalData = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      gender: new FormControl(''),
      institution: new FormControl('')
    });
  }

  public onOptionalDataSubmit(): void {
      this.userService.updateUserProfile(localStorage.getItem('username'), this.signUpFormOptionalData.getRawValue())
        .subscribe(() => this.router.navigateByUrl('/user/' + localStorage.getItem('username')), error => this.signUpError = error.error);
  }
}
