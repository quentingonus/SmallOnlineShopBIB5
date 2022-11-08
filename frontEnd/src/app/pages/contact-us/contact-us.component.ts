import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import * as e from 'express';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  form;

  formStatus = "";
  formErr: any = [];

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.form = fb.group({
      mail: ['', Validators.required],
      details: ['', Validators.required],
    });
  }

  async onSubmit(e: any) {
    e.preventDefault();
    let mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formStatus = "Submitting..."
    this.formErr = []
    for (let i in this.form.value) {
      if (!{ ...this.form.value }[i]) {
        this.formErr.push(`${i} cannot be empty.`)
      }
    }
    if (!this.form.value.mail?.toLowerCase().match(mailRegex)) {
      this.formErr.push(`Mail is invalid format.`)
    }
    if (this.form.value.details && this.form.value.details.length < 10) {
      this.formErr.push(`Please tell me at least 10 chars.`)
    }
    if (this.formErr.length) {
      this.formStatus = ""
      return
    }

    let res = await this.postService.sendFeedback(this.form.value.mail, this.form.value.details)
    this.formStatus = (res as any).msg;
    setTimeout(() => {
      this.formStatus = ""
      this.form.get("mail")?.setValue("")
      this.form.get("details")?.setValue("")
    }, 2000)
  }

  ngOnInit(): void {
  }

}
