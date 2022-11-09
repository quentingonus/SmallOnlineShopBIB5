import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("USER")
    localStorage.removeItem("ROLE")
    this.router.navigate(["login"])
  }

}
