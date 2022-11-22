import { PasswordValidators } from './../../Validators/password.validator';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { enableDebugTools } from '@angular/platform-browser';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  pageName = 'profile';
  isconfirm = false;
  isUpdate = false;
  isconfirm2 = false;
  isUpdate2 = false;
  isReset = false;
  form;
  addressForm;
  passwordForm;
  myOrder: any[] = [];
  userId: any = '';
  currentUser!: any;
  tmpForm!: any;
  profile: any;
  profileImage: any;
  uploadImagePreview: any;
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = fb.group({
      username: [''],
      email: [''],
    });

    this.addressForm = fb.group({
      dob: [{}],
      phone: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
    });

    this.passwordForm = fb.group(
      {
        oldpass: ['', Validators.required],
        newpass: ['', [Validators.required, Validators.minLength(5)]],
        confpass: ['', Validators.required],
      },
      {
        validator: PasswordValidators.passwordsShouldMatch,
      }
    );
  }

  update2() {
    this.addressForm.enable();
    this.isconfirm2 = true;
    this.isUpdate2 = true;
    this.tmpForm = { ...this.addressForm.value };
  }
  cancel2() {
    this.isconfirm2 = false;
    this.isUpdate2 = false;
    this.addressForm.disable();
    this.addressForm.get('phone')?.setValue(this.tmpForm.phone);
    this.addressForm.get('dob')?.setValue(this.tmpForm.dob);
    this.addressForm.get('address1')?.setValue(this.tmpForm.address1);
    this.addressForm.get('address2')?.setValue(this.tmpForm.address2);
    this.addressForm.get('city')?.setValue(this.tmpForm.city);
    this.addressForm.get('state')?.setValue(this.tmpForm.state);
  }
  confirm2() {
    this.authService
      .postUpdateUserAddress(this.currentUser, { ...this.addressForm.value })
      .then((res: any) => {
        Swal.fire("Update Success", "User profile is updated!", "success")
          .then(res2 => {
            this.addressForm.disable();
            this.tmpForm = {};
            localStorage.setItem('USER', JSON.stringify(res.data));
            this.isconfirm2 = false;
            this.isUpdate2 = false;
          })
      })
      .catch((err) => {
        Swal.fire("An Error Occurs", 'An error occurs at Updating Address', "error")
          .then(res => {
            this.addressForm.get('phone')?.setValue(this.tmpForm.phone);
            this.addressForm.get('dob')?.setValue(this.tmpForm.dob);
            this.addressForm.get('address1')?.setValue(this.tmpForm.address1);
            this.addressForm.get('address2')?.setValue(this.tmpForm.address2);
            this.addressForm.get('city')?.setValue(this.tmpForm.city);
            this.addressForm.get('state')?.setValue(this.tmpForm.state);
            this.addressForm.disable();
            this.isconfirm2 = false;
            this.isUpdate2 = false;
          })
      });
  }

  update() {
    this.form.enable();
    this.isconfirm = true;
    this.isUpdate = true;
    this.tmpForm = { ...this.form.value };
  }

  cancel() {
    this.isconfirm = false;
    this.isUpdate = false;
    this.form.disable();
    this.form.get('username')?.setValue(this.tmpForm.username);
    this.form.get('email')?.setValue(this.tmpForm.email);
  }

  confirm() {
    this.currentUser.name = this.form.value.username;
    this.currentUser.email = this.form.value.email;
    this.currentUser.profile = this.uploadImage;
    this.authService
      .postUpdateUser(this.currentUser)
      .then((res: any) => {
        Swal.fire("Update Success", "User profile is updated!", "success")
          .then(res2 => {
            this.form.disable();
            this.tmpForm = {};
            localStorage.setItem('USER', JSON.stringify(res.data));
            this.isconfirm = false;
            this.isUpdate = false;
          })
      })
      .catch((err) => {
        Swal.fire("An Error Occurs", 'An error occurs at Updating User', "error")
          .then(res => {
            this.form.get('username')?.setValue(this.tmpForm.username);
            this.form.get('email')?.setValue(this.tmpForm.email);
            this.form.disable();
            this.isconfirm = false;
            this.isUpdate = false;
          })
      });
  }

  resetPassword() {
    this.isReset = true;
    this.passwordForm.enable();
  }

  cancelUpdate() {
    this.passwordForm.get('oldpass')?.setValue(''),
      this.passwordForm.get('newpass')?.setValue(''),
      this.passwordForm.get('confpass')?.setValue('');
    this.isReset = false;
    this.passwordForm.disable();
  }

  confirmPassword() {
    let oldPass = this.passwordForm.get('oldpass')?.value;
    let newPass = this.passwordForm.get('newpass')?.value;
    let newPass2 = this.passwordForm.get('confpass')?.value;
    let errArr: any = []

    if (!oldPass) {
      errArr.push("Old Password is required.")
    }
    if (!newPass) {
      errArr.push("New Password is required.")
    }
    if (!newPass2) {
      errArr.push("Confirm Password is required.")
    }
    if (newPass.length < 6) {
      errArr.push("New Password min-length is 6.")
    }
    if (newPass != newPass2) {
      errArr.push("New Password and Confirm Password needs to be the same.")
    }

    if (errArr.length) {
      Swal.fire("An Error Occurs!", errArr[0], "error")
    }
    else {
      this.authService
        .resetPassword(this.userId, oldPass, newPass)
        .then((res: any) => {
          if (res.success) {
            Swal.fire("Update Success", "User profile is updated!", "success")
              .then(res3 => {
                this.passwordForm.get('oldpass')?.setValue('');
                this.passwordForm.get('newpass')?.setValue('');
                this.passwordForm.get('confpass')?.setValue('');
                this.passwordForm.disable();
                this.isReset = false;
              })
          } else {
            throw new Error(res.message);
          }
        })
        .catch((err: any) => {
          Swal.fire("An Error Occurs!", err.error, "error")
        });
    }
  }

  uploadImage(event: any) {
    this.form.enable();
    this.isconfirm = true;
    this.isUpdate = true;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.uploadImage = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.profile = reader.result);
      reader.readAsDataURL(file);
    }
  }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.currentUser = this.authService.getCurrentUser();
    this.profile = this.currentUser.profile ? this.currentUser.profile : this.profile;

    this.form.get('username')?.setValue(this.currentUser.name);
    this.form.get('email')?.setValue(this.currentUser.email);

    let addr = this.currentUser.address.split('|');
    this.addressForm.get('address1')?.setValue(addr[0]);
    this.addressForm.get('address2')?.setValue(addr[1]);
    this.addressForm.get('city')?.setValue(addr[2]);
    this.addressForm.get('state')?.setValue(addr[3]);
    this.addressForm.get('phone')?.setValue(this.currentUser.phone);
    let tmpDob = this.currentUser.dob;

    if (tmpDob) {
      tmpDob = new Date(tmpDob);
      this.addressForm.get('dob')?.setValue({
        year: tmpDob.getFullYear(),
        month: tmpDob.getMonth() + 1,
        day: tmpDob.getDate(),
      });
    } else {
      this.addressForm.get('dob')?.setValue({});
    }
    this.form.disable();
    this.addressForm.disable();
    this.passwordForm.disable();
    this.orderService
      .orderFindbyCustomer(this.currentUser._id)
      .then((res: any) => {
        this.myOrder = res.data.map((item: any, index: any) => {
          item.index = index + 1;
          return item;
        });
      })
      .catch((err: any) => {
        alert(err.error);
        this.myOrder = [];
      });
  }
}
