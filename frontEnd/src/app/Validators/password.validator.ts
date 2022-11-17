import { AbstractControl } from "@angular/forms";

export class PasswordValidators {
  static passwordsShouldMatch(control: AbstractControl) {

    let newPassword = control.get('newpass')?.value;
    let confirmPassword = control.get('confpass')?.value;

    console.log('New Password from Validator: ', newPassword)
    console.log('Conf Password from Validator: ', confirmPassword)
    if (newPassword != confirmPassword) { 
      return { passwordShouldMatch: true };
    }

    return null;
  }
}