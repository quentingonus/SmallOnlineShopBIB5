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
  forgetPasswordUpdateForm!: FormGroup;
  public password = "";
  public new_password = "";
  public password_confirm = "";
  public errorMsg: string = '';
  public userId: string = '';
  public token: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.token = this.activatedRoute.snapshot.params['token'];
    this.forgetPasswordUpdateForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  reset() {
    if (this.forgetPasswordUpdateForm.controls['password'].value && this.forgetPasswordUpdateForm.controls['confirmPassword'].value &&
      this.forgetPasswordUpdateForm.controls['password'].value !== this.forgetPasswordUpdateForm.controls['confirmPassword'].value) {
      this.errorMsg = "Password and Password confirmation are not matched";
    } else {
      const payload = {
        password: this.forgetPasswordUpdateForm.controls['password'].value;
      }
      this.authService.resetPasswordUpdate(this.userId, this.token, payload)
      this.router.navigate(['/login', {resetEmail: 'success'}]);
    }
  }
}
