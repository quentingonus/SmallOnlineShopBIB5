import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupUsers: any = [];
  signupObj: any = {
    fname: '',
    lname: '',
    email: '',
    username: '',
    pasword: '',
  }
  errArr: any = []


  constructor(
    private router: Router,
    private authService: AuthService,
    public util: UtilsService
  ) { }

  ngOnInit(): void {
  }

  register(signupBtn: any) {
    signupBtn.classList.add("loading")
    this.errArr = []
    let mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.signupObj.fname.length) {
      this.errArr.push("First Name cannot be blank.")
    }
    if (!this.signupObj.lname.length) {
      this.errArr.push("Last Name cannot be blank.")
    }
    if (!this.signupObj.email.length) {
      this.errArr.push("Email cannot be blank.")
    }
    if (!this.signupObj.username.length) {
      this.errArr.push("Username cannot be blank.")
    }
    if (this.signupObj.username.length && this.signupObj.username.length < 6) {
      this.errArr.push("Username should be over 6 characters.")
    }
    if (!this.signupObj.password.length) {
      this.errArr.push("Password cannot be blank.")
    }
    if (!this.signupObj.email.trim().match(mailRegex)) {
      this.errArr.push("Invalid email format.")
    }
    if (this.errArr.length) {
      signupBtn.classList.remove("loading")
      return
    }
    //this.signupUsers.push(this.signupObj);
    //localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    //this.signupObj = {
    //  fname: '',
    //  lname: '',
    //  email: '',
    //  username: '',
    //  pasword: '',
    //}
    this.authService.signUp({
      name: `${this.signupObj.fname} ${this.signupObj.lname}`,
      email: this.signupObj.email,
      password: this.signupObj.password,
    })
      .then(res => {
        this.errArr = []
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000)
      })
      .catch(err => {
        console.log(err)
      })
  }

  login() {
    this.router.navigate(['login']);
  }

}
