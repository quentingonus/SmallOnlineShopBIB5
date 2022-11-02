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
      id: 1,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 2,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 3,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 4,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },
    {
      id: 5,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'iPhone 14 Pro Max',
      price: 1399
    },

    {
      id: 6,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'Sony Xperia Z',
      price: 599
    },

    {
      id: 7,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'Mi Note 10',
      price: 699
    },

    {
      id: 8,
      category: 'phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800',
      title: 'Nokia',
      price: 799
    },
    {
      id: 9,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 1399
    },

    {
      id: 10,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 599
    },

    {
      id: 11,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 699
    },

    {
      id: 12,
      category: 'washing-machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg',
      title: 'Washing Machine',
      price: 799
    },
  ]

  getShop() {
    return this.shopItems
  }

  getCart(): Observable<any> {
    return this.cartItem$.asObservable();
  }

  addToCart(newItem: any) {
    console.log("Add to Cart: " + newItem.title + " | id: " + newItem.id)
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

  removeFromCart(item: any) {
    console.log("Remove Cart: " + item.title + " | id: " + item.id)
    const index = this.cartItem.indexOf(item);
    if (index > -1) {
      this.cartItem.splice(index, 1);
    }
    this.cartItem$.next(this.cartItem)
  }

  constructor() { }
}
