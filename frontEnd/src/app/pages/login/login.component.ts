import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.username.trim().length === 0) {
      this.errorMsg = "Username is required";
    } else if (this.password.trim().length === 0) {
      this.errorMsg = "Password is required";
    } else {
      this.errorMsg = "";
      let res = this.auth.login(this.username, this.password);
      if (res === 200) {
        this.router.navigate(['home']);
      }
      if (res === 403) {
        this.errorMsg = "Invalid Credentials";
      }
    }
  }
  
  signup() {
    this.router.navigate(['signup']);
  }

}
