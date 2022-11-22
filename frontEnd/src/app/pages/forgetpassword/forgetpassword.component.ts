import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  email = '';
  formErr: any = [];
  formStatus = '';

  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void { }

  onSubmit() {
    let mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formErr = [];
    this.formStatus = 'Submitting...';
    if (!this.email?.toLowerCase().match(mailRegex)) {
      this.formErr.push(`Mail is invalid format.`);
    }
    if (this.formErr.length) {
      this.formStatus = '';
      return;
    }
    this.postService
      .forgetPassword(this.email)
      .then((res: any) => {
        Swal.fire("Mail Sent!", "A link to reset password is sent successfully", 'success')
          .then(res2 => {
            this.email = '';
            this.formStatus = '';
            this.router.navigate(['/login'])
          })
      })
      .catch((e: any) => {
        Swal.fire("An Error Occurs!", e.error, 'error')
          .then(res3 => {
            this.formStatus = '';
          })
      });
  }

  reset() {
    this.router.navigate(['reset']);
  }
}
