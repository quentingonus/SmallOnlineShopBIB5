import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';

export interface Product {
  index?: any;
  id: number,
  category: string,
  imageUrl: string,
  title: string,
  price: number,
  amount: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItem: any = [];

  public cartItem$ = new Subject<any>();

  public shopItems: any = []

  async getShop() {
    let tmp = await this.postService.getProducts()

    return tmp.data.map((item: any) => {
      return {
        id: item._id,
        title: item.title,
        imageUrl: environment.apiUrl + "/" + item.profile,
        price: item.price,
        amount: 0,
        category: item.created_category_id,
      }
    })
  }

  async getCategory() {
    let category = await this.postService.getCategory()

    return category.data.map((item: any) => {
      return {
        id: item._id,
        title: item.name,
        imageUrl: environment.apiUrl + "/" + item.profile,
      }
    })
  }

  getCart(): Observable<any> {
    return this.cartItem$.asObservable();
  }

  getCartNormal() {
    return this.cartItem
  }

  findById(id: any, shopItems: any) {
    for (let i = 0; i < shopItems.length; i++) {
      if (shopItems[i].id == id) {
        return i
      }
    }
    return -2
  }

  addToCart(newItem: any) {
    let newIndex = this.findById(newItem.id, this.cartItem)
    if (newIndex > -1) {
      if ("amount" in this.cartItem[newIndex]) {
        if (newItem.amount == 0) {
          this.cartItem[newIndex].amount++;
        } else {
          this.cartItem[newIndex].amount = newItem.amount;
        }
      } else {
        this.cartItem[newIndex].amount++;
      }
    }
    else {
      if (!("amount" in newItem)) {
        newItem.amount = 1
      }
      if (newItem.amount == 0) {
        newItem.amount++
      }
      this.cartItem.push(newItem)
    }
    console.log("Add to Cart: " + newItem.title + " | amount: " + newItem.amount)
    this.cartItem$.next(this.cartItem)
  }

  async removeFromCart(item: any) {
    console.log("Remove Cart: " + item.title + " | amount: " + item.id)
    const index = this.findById(item.id, this.cartItem);
    const shopItem = await this.getShop()
    if (index > -1) {
      this.cartItem.splice(index, 1);
    }
    const shopIndex = this.findById(item.id, shopItem);
    if (shopIndex > -1) {
      shopItem[shopIndex].amount = 0
    }
    this.cartItem$.next(this.cartItem)
  }

  updateCart(item: any) {
    console.log("Update Cart: " + item.title + " | amount: " + item.amount)
    let newIndex = this.findById(item.id, this.cartItem)
    if (newIndex > -1) {
      this.cartItem[newIndex].amount = item.amount
    }
    else {
      this.cartItem[newIndex].amount = 0
    }
    this.cartItem$.next(this.cartItem)
  }

  deleteCart() {
    this.cartItem = []
    this.cartItem$.next(this.cartItem)

  }

  constructor(private postService: PostService) {

  }
}
