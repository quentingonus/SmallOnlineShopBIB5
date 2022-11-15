import { Injectable } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';
import { Observable, Subject, throwError, lastValueFrom, Observer } from 'rxjs';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  modifyItem(item: any) {
    return {
      id: item._id,
      title: item.title,
      imageUrl: item.profile.includes(environment.apiUrl) ? item.profile : environment.apiUrl + "/" + item.profile,
      price: item.price,
      detail: item.detail,
      amount: 0,
      category: item.created_category_id,
    }
  }

  async getShop() {
    let tmp = await this.postService.getProducts()
    return tmp.data.map((item: any) => this.modifyItem(item))
  }

  async getCategory() {
    let category = await this.postService.getCategory()

    return category.data.map((item: any) => {
      return {
        id: item._id,
        title: item.name,
        imageUrl: item.profile.includes(environment.apiUrl) ? item.profile : environment.apiUrl + "/" + item.profile,
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

  //API Request Session

  async postLoginCart() {
    const currentUser = this.authService.getCurrentUser()
    return await lastValueFrom(this.http.get(`${environment.apiUrl}/carts`))
      .then(async (res: any) => {
        const cartCached: any = JSON.parse(localStorage.getItem("CART") ? localStorage.getItem("CART")! : "{}")
        let cartToCache = res.data.filter((item: any) => item.created_user_id == currentUser._id)
        let emptyCart = cartToCache.length ? cartToCache[0] : await this.postCreateEmptyCart()
        if ("_id" in cartCached) {
          let formData = new FormData()
          formData.append("productId", JSON.stringify(cartCached.productId))
          formData.append("quantity", JSON.stringify(cartCached.quantity))
          formData.append("created_user_id", "_id" in currentUser ? currentUser._id : "")
          return await lastValueFrom(this.http.put(`${environment.apiUrl}/carts/${emptyCart._id}`, formData))
            .then((res: any) => {
              res = res.data
              localStorage.setItem("CART", JSON.stringify(res))
              return res
            })
            .catch((err: any) => {
              console.log(err)
              throw "An error occurs at Updating Cart @ Getting Login Cart."
            })
        }
      })
      .catch((err: any) => {
        console.log(err)
        throw "Cannot get Login Cart."
      })

  }

  async postGetCart() {
    const cartCached: any = JSON.parse(localStorage.getItem("CART") ? localStorage.getItem("CART")! : "{}")
    if ("_id" in cartCached) {
      let products = await this.getShop()
      for (let i = 0; i < products.length; i++) {
        let index = cartCached.productId.indexOf(products[i].id)
        if (index > -1) {
          let cartIndex = this.findById(products[i].id, this.cartItem)
          if (cartIndex < 0) {
            products[i].amount = parseInt(cartCached.quantity[index])
            this.cartItem.push(products[i])
          }
        }
      }
      this.cartItem$.next(this.cartItem)
    }
  }

  async postCreateEmptyCart() {
    if (!this.authService.isAuthenticated()) {
      localStorage.setItem("CART", JSON.stringify({
        productId: [],
        quantity: [],
        _id: ""
      }))
      return
    }
    const currentUser = this.authService.getCurrentUser()
    let formData = new FormData()
    formData.append("productId", JSON.stringify([]))
    formData.append("quantity", JSON.stringify([]))
    formData.append("created_user_id", "_id" in currentUser ? currentUser._id : "")
    return await lastValueFrom(this.http.post(`${environment.apiUrl}/carts`, formData))
      .then((res: any) => {
        localStorage.setItem("CART", JSON.stringify(res.data))
        return res.data
      })
      .catch((err: any) => {
        console.log(err)
        throw "An error occurs at creating empty cart."
      })
  }

  async postUpdateCart() {
    const currentUser = this.authService.getCurrentUser()
    const cartCached: any = JSON.parse(localStorage.getItem("CART") ? localStorage.getItem("CART")! : "{}")
    let productArr: any = []
    let quantityArr: any = []
    this.cartItem.forEach((item: any) => {
      productArr.push(item.id)
      quantityArr.push(item.amount)
    });

    if (!this.authService.isAuthenticated()) {
      localStorage.setItem("CART", JSON.stringify({
        productId: productArr,
        quantity: quantityArr,
        _id: ""
      }))
      return
    }
    if (productArr.length) {
      let formData = new FormData()
      formData.append("productId", JSON.stringify(productArr))
      formData.append("quantity", JSON.stringify(quantityArr))
      formData.append("created_user_id", "_id" in currentUser ? currentUser._id : "")
      return await lastValueFrom(this.http.put(`${environment.apiUrl}/carts/${cartCached._id}`, formData))
        .then((res: any) => {
          res = res.data
          localStorage.setItem("CART", JSON.stringify(res))
          return res
        })
        .catch((err: any) => {
          console.log(err)
          throw "An error occurs at updating cart."
        })
    }
  }

  async postDeleteCart() {
    const cartCached: any = JSON.parse(localStorage.getItem("CART")!)

    if (cartCached && "_id" in cartCached) {
      return await lastValueFrom(this.http.delete(`${environment.apiUrl}/carts/${cartCached._id}`))
        .then(res => {
          return localStorage.removeItem("CART")
        })
    } else {
      return
    }
  }

  // API Request Session Ends

  async addToCart(newItem: any) {
    try {
      if (!(localStorage.getItem("CART"))) {
        await this.postCreateEmptyCart()
      }
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
      await this.postUpdateCart()
      console.log("Add to Cart: " + newItem.title + " | amount: " + newItem.amount)
      this.cartItem$.next(this.cartItem)
    } catch (e) {
      console.log(e)
    }
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
    this.postUpdateCart()
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
    this.postUpdateCart()
    this.cartItem$.next(this.cartItem)
  }

  async deleteCart() {
    this.cartItem = []
    this.postUpdateCart()
    await this.postDeleteCart()
    this.cartItem$.next(this.cartItem)

  }

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
  }
}