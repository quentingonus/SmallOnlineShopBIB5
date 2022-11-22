import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
  static passwordsShouldMatch(control: AbstractControl) {
    let newPassword = control.get('newpass')?.value;
    let confirmPassword = control.get('confpass')?.value;
    if (newPassword != confirmPassword) {
      return { passwordShouldMatch: true };
    }

    return null;
  }
}
