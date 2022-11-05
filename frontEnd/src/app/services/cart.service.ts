import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

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
        category: 'shoe',
      }
    })
  }

  getCart(): Observable<any> {
    return this.cartItem$.asObservable();
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
    console.log("Add to Cart: " + newItem.title + " | id: " + newItem.id + " | amount: " + newItem.amount)
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
    this.cartItem$.next(this.cartItem)
  }

  async removeFromCart(item: any) {
    console.log("Remove Cart: " + item.title + " | id: " + item.id)
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

  constructor(private postService: PostService) {

  }
}
