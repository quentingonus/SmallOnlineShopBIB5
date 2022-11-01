import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  shopItems!: any;

  constructor(private cart: CartService) { }

  addToCart(item: any) {
    this.cart.addToCart(item)
  }

  ngOnInit(): void {
    this.shopItems = this.cart.getShop()
  }

}
