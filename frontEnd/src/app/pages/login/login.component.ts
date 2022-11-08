import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  errorMsg = "";
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    //if (this.username.trim().length === 0) {
    //  this.errorMsg = "Username is required";
    //} else if (this.password.trim().length === 0) {
    //  this.errorMsg = "Password is required";
    //} else {
    //  this.errorMsg = "";
    //  let res = this.authService.login(this.username, this.password);
    //  if (res === 200) {
    //    this.router.navigate(['home']);
    //  }
    //  if (res === 403) {
    //    this.errorMsg = "Invalid Credentials";
    //  }
    //}

    const payload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.login(payload).then((dist: any) => {
      localStorage.setItem('token', dist.token);
      localStorage.setItem('userLoginData', JSON.stringify(dist.user));
      this.router.navigate(['home']);
    })
  }
  
  forget() {
    this.router.navigate(['forget']);
  }

  signup() {
    this.router.navigate(['signup']);
  }

}
