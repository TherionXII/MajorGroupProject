import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor() { }

  public validatePassword(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('repeatPassword').value
      ? null : {
        validatePassword: {
          valid: false
        }
      };
  }
}
