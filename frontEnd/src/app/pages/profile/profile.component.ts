import { OrderService } from 'src/app/services/order.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pageName = 'profile';
  isconfirm = false;
  isUpdate = false;
  form;
  myOrder: any[] = [];

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.form = fb.group({
      username: ['PhyoThiHA0805'],
      email: ['bib.ptkyaw505@gmail.com']
    })
  }
  
  update() {
    this.form.enable();
    this.isconfirm = true;
    this.isUpdate = true;
  }

  cancel(form: any) {
    this.isconfirm = false;
    this.isUpdate = false;
    this.form.disable();
    this.form.get('username')?.setValue('PhyoThiHA0805')
    this.form.get('email')?.setValue('bib.ptkyaw505@gmail.com');
  }

  confirm() {
    this.isconfirm = false;
    this.isUpdate = false;
  }

  ngOnInit(): void {
    this.form.disable();
    this.myOrder = this.orderService.orderFindbyCustomer('PhyoThiHA');
  }

}
