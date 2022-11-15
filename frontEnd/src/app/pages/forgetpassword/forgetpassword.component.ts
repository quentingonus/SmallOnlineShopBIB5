import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  email = "";
  formErr: any = [];
  formStatus = ""

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formErr = []
    this.formStatus = "Submitting..."
    if (!this.email?.toLowerCase().match(mailRegex)) {
      this.formErr.push(`Mail is invalid format.`)
    }
    if (this.formErr.length) {
      this.formStatus = ""
      return
    }
    this.postService.forgetPassword(this.email)
      .then((res: any) => {
        this.formStatus = res.msg;
        this.email = ""
      })
      .catch((e: any) => {
        this.formErr.push(e.error)
        this.formStatus = "";
      })
  }

  reset() {
    this.router.navigate(['reset']);
  }

}
