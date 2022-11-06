import { CartService } from './../../services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  form;
  cartItem: any;
  constructor(private fb: FormBuilder, private cartService: CartService) {
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
      card_number: ['', Validators.required]
    });

  }

  onSubmit() {
    console.log(this.form)
  }

  totalCartItem() {
    console.log('From Method:',this.cartItem)
    if (!this.cartItem) {
      return 0
    }
    let totalAmount = 0
    this.cartItem.map((item: any) => {
      totalAmount += item.amount
    })
    return totalAmount
  }

  ngOnInit(): void {
     this.cartService.getCart().subscribe((item: any) => {
       this.cartItem = item;
       console.log(item);
     });
  }

}
