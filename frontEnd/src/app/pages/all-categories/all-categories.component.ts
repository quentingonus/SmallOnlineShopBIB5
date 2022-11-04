import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  shopItems!: any;

  constructor(public cart: CartService) { }

  async ngOnInit() {
    let shopItem = await this.cart.getShop();
    this.shopItems = this.cart.modifyCategory(shopItem);
    this.cart.getKeyArr(this.shopItems);
  }

}
