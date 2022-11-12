import { OrderService } from './../../services/order.service';
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
  newOrder: any;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.form = fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      email: [],
      address1: ['', Validators.required],
      address2: [''],
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

  async onSubmit() {
    console.log(this.form);
    let newCustomer = { date: new Date(), ...this.form.value };

    this.newOrder = [{
      totalPrice: this.totalPrice(),
      discount: this.discountPrice,
      ...this.cartService.getCartNormal()[0],
    }];

    await this.orderService.postCreateOrder(newCustomer, this.newOrder)

    this.confirmOrder = true;
    this.cartService.deleteCart();
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
    } else {
      this.hasPromo = false;
    }
  }

  ngOnInit(): void {
    this.cartItem = this.cartService.getCartNormal();
    if (this.cartItem.length <= 0) this.router.navigate(['/home']);
  }
}
