import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupUsers: any = [];
  signupObj: any = {
    fname: '',
    lname: '',
    email: '',
    pasword: '',
  };
  errArr: any = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    public util: UtilsService
  ) { }

  ngOnInit(): void { }

  register(signupBtn: any) {
    signupBtn.classList.add('loading');
    this.errArr = [];
    let mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.signupObj.fname || !this.signupObj.fname.length) {
      this.errArr.push('First Name cannot be blank.');
    }
    if (!this.signupObj.lname || !this.signupObj.lname.length) {
      this.errArr.push('Last Name cannot be blank.');
    }
    if (!this.signupObj.email || !this.signupObj.email.length) {
      this.errArr.push('Email cannot be blank.');
    }
    if (!this.signupObj.password || !this.signupObj.password.length) {
      this.errArr.push('Password cannot be blank.');
    }
    if (!this.signupObj.email.trim().match(mailRegex)) {
      this.errArr.push('Invalid email format.');
    }
    if (this.errArr.length) {
      signupBtn.classList.remove('loading');
      return;
    }
    this.authService
      .signUp({
        name: `${this.signupObj.fname} ${this.signupObj.lname}`,
        email: this.signupObj.email,
        password: this.signupObj.password,
      })
      .then((res: any) => {
        Swal.fire("Welcome " + res.data.name, "Register Success!", 'success')
          .then(res => {
            this.router.navigate(['login']);
          })
      })
      .catch((err: any) => {
        signupBtn.classList.remove('loading');
        Swal.fire("Error Occurs!", err.error, 'error')
      });
    this.errArr = [];
  }

  login() {
    this.router.navigate(['login']);
  }
}
