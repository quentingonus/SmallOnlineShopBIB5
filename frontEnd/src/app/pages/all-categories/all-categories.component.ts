import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  shopItems!: any;


//  modifyCategory(shopItem: any) {
//    let newArr: any = {};
//    shopItem.map((item: any) => {
//      newArr[item.category] = item.category in newArr ? newArr[item.category] : []
//      newArr[item.category].push(item)
//    })
//    return newArr
//  }
//
//  getKeyArr(obj: any) {
//    return Object.keys(obj)
//  }

  constructor(public cart: CartService) { }

  ngOnInit(): void {
    this.shopItems = this.cart.modifyCategory(this.cart.getShop());
    this.cart.getKeyArr(this.shopItems);
  }

}
