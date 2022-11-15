import { OrderService } from 'src/app/services/order.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  addressForm;
  myOrder: any[] = [];
  userId: any = ""
  currentUser!: any;
  tmpForm!: any;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = fb.group({
      username: [''],
      email: ['']
    });

    this.addressForm = fb.group({
      phone: ['09445442252'],
      address1: ['1106 Kyaunggone(1) Street, Aungsan, Insein'],
      address2: ['-------'],
      city: ['Yangon'],
      state: ['Yangon'],
    })
  }

  update() {
    this.form.enable();
    this.isconfirm = true;
    this.isUpdate = true;
    this.tmpForm = { ...this.form.value }
  }

  cancel(form: any) {
    this.isconfirm = false;
    this.isUpdate = false;
    this.form.disable();
    this.form.get('username')?.setValue(this.tmpForm.username)
    this.form.get('email')?.setValue(this.tmpForm.email);
  }

  confirm() {
    this.isconfirm = false;
    this.isUpdate = false;
    this.currentUser.name = this.form.value.username
    this.currentUser.email = this.form.value.email
    this.authService.postUpdateUser(this.currentUser)
      .then((res: any) => {
        this.form.disable();
        this.tmpForm = {}
        localStorage.setItem('USER', JSON.stringify(res.data));
      })
      .catch(err => {
        this.form.get('username')?.setValue(this.tmpForm.username)
        this.form.get('email')?.setValue(this.tmpForm.email);
        alert("An error occurs at Updating User")
        this.form.disable();
      })
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.currentUser = this.authService.getCurrentUser()
    this.form.get('username')?.setValue(this.currentUser.name)
    this.form.get('email')?.setValue(this.currentUser.email)
    this.form.disable();
    this.addressForm.disable();
    this.myOrder = await this.orderService.orderFindbyCustomer(this.currentUser._id);
  }

}
