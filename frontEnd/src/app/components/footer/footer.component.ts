import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  email = ""

  constructor() { }

  subscribe() {
    let errMsg = []
    if (this.email.trim().length === 0) {
      errMsg.push('Email is required')
    }
    if (this.email.trim().length === 0) {
      errMsg.push('Password is required')
    }
    let mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.email.trim().match(mailRegex)) {
      errMsg.push('Invalid email format')
    }
    if (errMsg.length) {
      Swal.fire("An Error Occurs!", errMsg[0], "error")
    } else {
      Swal.fire("Subscription Successful!", "We will email you once we have news!", "success")
        .then(res => {
          this.email = ""
        })
    }
  }

  ngOnInit(): void {
  }

}
