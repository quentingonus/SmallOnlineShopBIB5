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
  isconfirm2 = false;
  isUpdate2 = false;
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
      dob: [{}],
      phone: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
    })
  }

  update2() {
    this.addressForm.enable();
    this.isconfirm2 = true;
    this.isUpdate2 = true;
    this.tmpForm = { ...this.addressForm.value }
  }
  cancel2() {
    this.isconfirm2 = false;
    this.isUpdate2 = false;
    this.addressForm.disable();
    this.addressForm.get('phone')?.setValue(this.tmpForm.phone)
    this.addressForm.get('dob')?.setValue(this.tmpForm.dob)
    this.addressForm.get('address1')?.setValue(this.tmpForm.address1);
    this.addressForm.get('address2')?.setValue(this.tmpForm.address2);
    this.addressForm.get('city')?.setValue(this.tmpForm.city);
    this.addressForm.get('state')?.setValue(this.tmpForm.state);
  }
  confirm2() {
    this.isconfirm2 = false;
    this.isUpdate2 = false;
    this.authService.postUpdateUserAddress(this.currentUser, { ...this.addressForm.value })
      .then((res: any) => {
        this.addressForm.disable();
        this.tmpForm = {}
        localStorage.setItem('USER', JSON.stringify(res.data));
      })
      .catch(err => {
        this.addressForm.get('phone')?.setValue(this.tmpForm.phone)
        this.addressForm.get('dob')?.setValue(this.tmpForm.dob)
        this.addressForm.get('address1')?.setValue(this.tmpForm.address1);
        this.addressForm.get('address2')?.setValue(this.tmpForm.address2);
        this.addressForm.get('city')?.setValue(this.tmpForm.city);
        this.addressForm.get('state')?.setValue(this.tmpForm.state);
        alert("An error occurs at Updating Address")
        this.addressForm.disable();
      })
  }

  update() {
    this.form.enable();
    this.isconfirm = true;
    this.isUpdate = true;
    this.tmpForm = { ...this.form.value }
  }

  cancel() {
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
    let addr = this.currentUser.address.split("|")
    this.addressForm.get('address1')?.setValue(addr[0])
    this.addressForm.get('address2')?.setValue(addr[1])
    this.addressForm.get('city')?.setValue(addr[2])
    this.addressForm.get('state')?.setValue(addr[3])
    this.addressForm.get('phone')?.setValue(this.currentUser.phone)
    let tmpDob = this.currentUser.dob
    if (tmpDob) {
      tmpDob = new Date(tmpDob)
      this.addressForm.get('dob')?.setValue({
        year: tmpDob.getFullYear(),
        month: tmpDob.getMonth() + 1,
        day: tmpDob.getDate()
      })
    } else {
      this.addressForm.get('dob')?.setValue({})
    }
    this.form.disable();
    this.addressForm.disable();
    let tmpOrder = await this.orderService.orderFindbyCustomer(this.currentUser._id);
    this.myOrder = tmpOrder.map((item: any, index: any) => { item.index = index + 1; return item; });
  }

}
