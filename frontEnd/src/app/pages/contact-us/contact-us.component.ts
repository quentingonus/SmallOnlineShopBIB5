import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import * as e from 'express';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  form;

  formStatus = "";
  formErr: any = [];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      mail: ['', Validators.required],
      details: ['', Validators.required],
    });
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.formStatus = "Submitting..."
    this.formErr = []
    for (let i in this.form.value) {
      if (!{ ...this.form.value }[i]) {
        this.formErr.push(`${i} cannot be empty.`)
      }
    }
    if (this.formErr.length) {
      this.formStatus = ""
      return
    }
    // Form Submitting Job
    this.formStatus = "Successfully submitted! <i class='bi bi-check-lg text-success'></i>"
    setTimeout(() => { this.formStatus = "" }, 2000)
  }

  ngOnInit(): void {
  }

}
