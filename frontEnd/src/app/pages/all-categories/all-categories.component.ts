import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  shopItems!: any;

  constructor(private cart: CartService, public util: UtilsService) { }

  async ngOnInit() {
    let shopItem = await this.cart.getShop();
    this.shopItems = this.util.modifyCategory(shopItem);
    this.util.getKeyArr(this.shopItems);
  }

}
