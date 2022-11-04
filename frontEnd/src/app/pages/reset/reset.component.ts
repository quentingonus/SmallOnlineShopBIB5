import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  password = "";
  new_password = "";
  password_confirm= "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  reset() {
    //if (this.password === "admin123") {
    //  this.router.navigate(['login'])
    //} else {
    //  alert ("Password doesn't match!")
    //}
  }
}
