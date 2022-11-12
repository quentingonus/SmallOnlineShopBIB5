import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  errorMsg = "";
  params!: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public util: UtilsService
  ) {
  }

  login(signinBtn: any) {
    signinBtn.classList.add("loading")
    if (this.username.trim().length === 0) {
      this.errorMsg = "Email is required";
    }
    if (this.password.trim().length === 0) {
      this.errorMsg = "Password is required";

    }
    let mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.username.trim().match(mailRegex)) {
      this.errorMsg = "Invalid email format";
    }
    if (this.errorMsg != "") {
      signinBtn.classList.remove("loading")
      return
    }

    this.authService.login({
      mail: this.username,
      password: this.password
    }).then((dist: any) => {
      localStorage.setItem('TOKEN', dist.token);
      localStorage.setItem('USER', JSON.stringify(dist.user));
      localStorage.setItem('ROLE', dist.user.type.toUpperCase());
      if ("redirect" in this.params) {
        this.router.navigate([this.params.redirect]);
      } else {
        this.router.navigate(['home']);
      }
    }).catch((err: any) => {
      this.errorMsg = "Creditionals doesn't match."
      signinBtn.classList.remove("loading")
    })
  }

  forget() {
    this.router.navigate(['forget']);
  }

  signup() {
    this.router.navigate(['signup']);
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.params = params
    });
  }

}
