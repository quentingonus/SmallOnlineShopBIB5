import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  new_password = '';
  password_confirm = '';
  formErr: any = [];
  userId!: any;
  resetToken!: any;
  tokenValid = 'unknown';

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
      this.resetToken = params['token'];
    });
    this.authService
      .checkResetToken(this.userId, this.resetToken)
      .then((res: any) => {
        if (res.success) {
          this.tokenValid = 'valid';
        } else {
          this.tokenValid = 'not-valid';
        }
      })
      .catch((err: any) => {
        this.tokenValid = 'not-valid';
      });
  }
  reset() {
    this.formErr = [];
    if (!this.new_password.length) {
      this.formErr.push('New Password is required');
    }
    if (!this.password_confirm.length) {
      this.formErr.push('Password Confirmation is required');
    }
    if (this.new_password.length < 6) {
      this.formErr.push('Password length must be at least 6.');
    }
    if (this.new_password != this.password_confirm) {
      this.formErr.push('Password and Confirm Password needs to be the same.');
    }
    if (this.formErr.length) {
      Swal.fire("An Error Occurs!", this.formErr[0], "error");
    } else {
      this.authService
        .changePassword(this.userId, this.resetToken, this.new_password)
        .then((res: any) => {
          if (!res.success) {
            Swal.fire("An Error Occurs!", res.message, "error")
          } else {
            Swal.fire("Reset Success!", "Password reset successful!", "success")
              .then(res => {
                this.route.navigate(['/login']);
              })
          }
        })
        .catch((err: any) => {
          Swal.fire("An Error Occurs!", err.error, "error")
        });
    }
  }
}
