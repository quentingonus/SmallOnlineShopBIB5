import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  email = "";

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  reset() {
    this.router.navigate(['reset']);
  }

}
