import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  new_password = "";
  password_confirm = "";
  formErr: any = [];
  userId!: any;
  resetToken!: any;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.resetToken = params['token'];
    });
    console.log(this.userId)
    console.log(this.resetToken);

  }
  reset() {
    if (!this.new_password.length) {
      this.formErr.push("New Password is required")
    }
    if (!this.password_confirm.length) {
      this.formErr.push("Password Confirmation is required")
    }
    if (this.new_password.length < 6) {
      this.formErr.push("Password length must be at least 6.")
    }
    if (this.new_password != this.password_confirm) {
      this.formErr.push("Password and Confirm Password needs to be the same.")
    }
    if (this.formErr.length) {
      return
    }
    this.authService.changePassword(this.userId, this.resetToken, this.new_password)
      .then((res: any) => {
        this.route.navigate(['/login'])
      })
      .catch((err: any) => {
        this.formErr.push(err.error)
      })
    //if (this.forgetPasswordUpdateForm.controls['password'].value && this.forgetPasswordUpdateForm.controls['confirmPassword'].value &&
    //  this.forgetPasswordUpdateForm.controls['password'].value !== this.forgetPasswordUpdateForm.controls['confirmPassword'].value) {
    //  this.errorMsg = "Password and Password confirmation are not matched";
    //} else {
    //  const payload = {
    //    password: this.forgetPasswordUpdateForm.controls['password'].value
    //  }
    //  this.authService.resetPasswordUpdate(this.userId, this.token, payload)
    //  this.router.navigate(['/login', { resetEmail: 'success' }]);
    //}
  }
}
