import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupUsers : any = [];
  signupObj : any = {
    fname: '',
    lname: '',
    email: '',
    username: '',
    pasword: '',
  }
 

  constructor(private router: Router) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  register() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      fname: '',
      lname: '',
      email: '',
      username: '',
      pasword: '',
    }
  }

  login() {
    this.router.navigate(['login']);
  }

}
