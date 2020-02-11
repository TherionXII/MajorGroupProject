import {FormGroup} from '@angular/forms';

export class ValidatorMethods {
  public static getPasswordEqualValidator(formGroup: FormGroup): { validatePassword: { valid }} {
    const password = formGroup.get('password').value;
    const repeatPassword = formGroup.get('repeatPassword').value;

    return password === repeatPassword ? null : { validatePassword: { valid: false } };
  }
}
