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
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 6,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 7,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 8,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
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
