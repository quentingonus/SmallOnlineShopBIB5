import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';

export interface Product {
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

  public shopItems: Product[] = [
    {
      id: 1,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7,
      amount: 0
    },

    {
      id: 2,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7,
      amount: 0
    },

    {
      id: 3,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7,
      amount: 0
    },

    {
      id: 4,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7,
      amount: 0
    },
    {
      id: 5,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'iPhone 14 Pro Max',
      price: 1399,
      amount: 0
    },

    {
      id: 6,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'Sony Xperia Z',
      price: 599,
      amount: 0
    },

    {
      id: 7,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'Mi Note 10',
      price: 699,
      amount: 0
    },

    {
      id: 8,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'Nokia',
      price: 799,
      amount: 0
    },
    {
      id: 9,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 1399,
      amount: 0
    },

    {
      id: 10,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 599,
      amount: 0
    },

    {
      id: 11,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 699,
      amount: 0
    },

    {
      id: 12,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 799,
      amount: 0
    },
  ]

  getShop() {
    return this.shopItems
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

  removeFromCart(item: any) {
    console.log("Remove Cart: " + item.title + " | id: " + item.id)
    const index = this.findById(item.id, this.cartItem);
    if (index > -1) {
      this.cartItem.splice(index, 1);
    }
    const shopIndex = this.findById(item.id, this.shopItems);
    if (shopIndex > -1) {
      this.shopItems[shopIndex].amount = 0
    }
    this.cartItem$.next(this.cartItem)
  }

  modifyCategory(shopItem: any) {
    let newArr: any = {};
    shopItem.map((item: any) => {
      newArr[item.category] = item.category in newArr ? newArr[item.category] : []
      newArr[item.category].push(item)
    })
    return newArr
  }

  getKeyArr(obj: any) {
    return Object.keys(obj)
  }

  constructor() {
  }
}
