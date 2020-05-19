import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorMethods} from '../../HelperClasses/ValidatorMethods';
import {IUser} from '../../../User/Interfaces/IUser';
import {UserService} from '../../../User/Services/user.service';

@Component({
  selector: 'app-mandatory-sign-up',
  templateUrl: './mandatory-sign-up.component.html',
  styleUrls: ['./mandatory-sign-up.component.css']
})
export class MandatorySignUpComponent implements OnInit {
  @Output()
  public userCreatedEvent: EventEmitter<string>;

  public signUpFormRequiredData: FormGroup;

  public signUpError: string;

  constructor(private userService: UserService) {
    this.userCreatedEvent = new EventEmitter<string>();
    this.signUpError = '';
  }

  public ngOnInit(): void {
    this.signUpFormRequiredData = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      repeatPassword: new FormControl('', [ Validators.required, Validators.minLength(8) ]),
      email: new FormControl('', [ Validators.required, Validators.email ])
    }, ValidatorMethods.getPasswordEqualValidator);
  }

  public onRequiredDataSubmit() {
    this.userService.createUser(this.signUpFormRequiredData.value as IUser)
      .subscribe(() => this.userCreatedEvent.emit(this.signUpFormRequiredData.get('username').value), error => this.signUpError = error.error);
  }
}
