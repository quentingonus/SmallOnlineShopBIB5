import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItem: any = [];

  public cartItem$ = new Subject<any>();

  public shopItems = [
    {
      name: "iPhone 14 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1499,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    },
    {
      name: "iPhone 13 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1399,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    },
    {
      name: "iPhone 12 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1299,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    },
    {
      name: "iPhone 11 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1199,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    },
    {
      name: "iPhone 10 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1099,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    },
    {
      name: "iPhone 12 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1299,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    },
    {
      name: "iPhone 11 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1199,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    },
    {
      name: "iPhone 10 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1099,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    }
  ]

  getShop() {
    return this.shopItems
  }

  getCart(): Observable<any> {
    return this.cartItem$.asObservable();
  }

  addToCart(newItem: any) {
    let newIndex = this.cartItem.indexOf(newItem)
    if (newIndex > -1) {
      this.cartItem[newIndex].amount++;
    }
    else {
      newItem.amount = 1
      this.cartItem.push(newItem)
    }
    this.cartItem$.next(this.cartItem)
  }

  constructor() { }
}
