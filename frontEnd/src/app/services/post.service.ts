import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom, Subject } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private util: UtilsService) {
    this.getProducts()
  }

  // Product Service

  getProducts(): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/product`))
  }

  async getProductsByCategory(categoryId: any): Promise<any> {
    let product = await this.getProducts()
    product = product.data.map((item: any) => {
      return {
        category: item.created_category_id,
        ...item
      }
    })
    product = this.util.modifyCategory(product)
    return product[categoryId]
  }

  createProducts(product: any) {
    //const token = localStorage.getItem("TOKEN") || "";
    //const user = JSON.parse(localStorage.getItem("USER") || "[]")
    //if (!user.length) {
    //  return null
    //}
    //const options = {
    //  headers: new HttpHeaders()
    //    .set('Content-Type', 'application/json;charset=utf-8;')
    //    .set('Cache-Control', 'no-cache')
    //    .set('Pragma', 'no-cache')
    //    .set('userType', user.type)
    //    .set('userId', user._id)
    //    .set('Authorization', `Bearer ${token}`)
    //};
    let formData = new FormData();

    //Temporary Adding Default Value
    formData.append("created_user_id", "636a297484a745b2bd40a3b0")

    formData.append("title", product.title)
    formData.append("price", product.price)
    formData.append("profileImage", product.imageUrl)
    formData.append("created_category_id", product.category)

    return lastValueFrom(this.http.post(`${environment.apiUrl}/product`, formData))
  }

  updateProducts(product: any): Promise<any> {
    let formData = new FormData();

    //Temporary Adding Default Value
    formData.append("created_user_id", "636a297484a745b2bd40a3b0")

    formData.append("title", product.title)
    formData.append("price", product.price)
    formData.append("profileImage", product.imageUrl)
    formData.append("created_category_id", product.category)

    return lastValueFrom(this.http.put(`${environment.apiUrl}/product/${product.id}`, formData))
  }

  deleteProduct(product: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/product/${product.id}`))
  }

  // Category Service

  getCategory(): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/category`))
  }

  createCategory(name: any, image: any): Promise<any> {
    let formData = new FormData();
    formData.append("name", name)
    formData.append("profileImage", image)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/category`, formData))
  }

  searchCategory(id: any) {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/category/${id}`))
  }

  // Cart Service

  getCart(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/cart`))
  }

  createCart(id: any, product: any): Promise<any> {
    let formData = new FormData();
    // Must be changed
    //formData.append("name", id)
    //formData.append("profileImage", product)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/cart`, formData))
  }

  updateCart(id: any, product: any): Promise<any> {
    let formData = new FormData();
    // Must be changed
    //formData.append("name", id)
    //formData.append("profileImage", product)
    return lastValueFrom(this.http.put(`${environment.apiUrl}/cart`, formData))
  }

  // Order Service

  getOrder(): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/purchase/`))
  }

  getOrderById(id: any): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/purchase/${id}`))
  }

  createOrder(product: any, quantity: any): Promise<any> {
    let formData = new FormData();

    //Temporary Adding Default Value
    formData.append("created_user_id", "636a297484a745b2bd40a3b0")

    formData.append("productId", JSON.stringify(product))
    formData.append("quantity", JSON.stringify(quantity))
    formData.append("date", new Date().toLocaleString())
    formData.append("order_status", "new order")

    return lastValueFrom(this.http.post(`${environment.apiUrl}/purchase/`, formData))
  }

  updateOrder(product: any, quantity: any): Promise<any> {
    let formData = new FormData();

    //Temporary Adding Default Value
    formData.append("created_user_id", "636a297484a745b2bd40a3b0")

    formData.append("productId", JSON.stringify(product))
    formData.append("quantity", JSON.stringify(quantity))
    formData.append("date", new Date().toLocaleString())
    formData.append("order_status", "new order")

    return lastValueFrom(this.http.post(`${environment.apiUrl}/purchase/`, formData))
  }

  // Send Feedback

  sendFeedback(mail: any, details: any) {
    let formData = new FormData();
    formData.append("email", mail)
    formData.append("detail", details)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/contactus`, formData))
  }


}
