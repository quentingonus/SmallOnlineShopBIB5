import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  form;
  cartItem: any;
  hasPromo: boolean = false;
  discount!: number;
  discountPrice!: number;
  confirmOrder = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.form = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      email: [],
      address1: ['', Validators.required],
      address2: [],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      sameaddress: [],
      remember: [],
      payment: ['', Validators.required],
      card_name: ['', Validators.required],
      card_number: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form);
    this.confirmOrder = true;
  }

  totalCartItem() {
    if (!this.cartItem) {
      return 0;
    }
    let totalAmount = 0;
    this.cartItem.map((item: any) => {
      totalAmount += item.amount;
    });
    return totalAmount;
  }

  totalPrice() {
    if (!this.cartItem) {
      return 0;
    }
    let totalPrice = 0;
    this.cartItem.map((item: any) => {
      totalPrice += item.price * item.amount;

    });
    if (this.hasPromo) {
      this.discountPrice = (this.discount / 100) * totalPrice;
      return totalPrice - this.discountPrice;
    }

    return totalPrice;
  }

  redeem(promocode: string) {
    if (promocode) {
      let promo = promocode.split('%');
      this.discount = parseInt(promo[0]);
      this.hasPromo = true;
    }

    else {
      this.hasPromo = false;
    }
    
  }

  ngOnInit(): void {
    this.cartItem = this.cartService.getCartNormal();
    if (this.cartItem.length <= 0) this.router.navigate(['/home']);
  }
}
