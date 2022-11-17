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
    return lastValueFrom(this.http.get(`${environment.apiUrl}/product?page=1&chunk=1000`))
  }

  getPopular(): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/popular?page=1&chunk=1000`))
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
    const options = {
      headers: new HttpHeaders().set("Authentication", "Bearer "+(localStorage.getItem("TOKEN") || ""))
    };
    let formData = new FormData();
    formData.append("created_user_id", JSON.parse(localStorage.getItem("USER")!)._id)
    formData.append("title", product.title)
    formData.append("price", product.price)
    formData.append("profileImage", product.imageUrl)
    formData.append("detail", product.detail)
    formData.append("created_category_id", product.category)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/product`, formData, options))
  }

  updateProducts(product: any): Promise<any> {
    const options = {
      headers: new HttpHeaders().set("Authentication", "Bearer "+(localStorage.getItem("TOKEN") || ""))
    };
    let formData = new FormData();
    formData.append("created_user_id", JSON.parse(localStorage.getItem("USER")!)._id)
    formData.append("title", product.title)
    formData.append("price", product.price)
    formData.append("profileImage", product.imageUrl)
    formData.append("detail", product.detail)
    formData.append("created_category_id", product.category)
    return lastValueFrom(this.http.put(`${environment.apiUrl}/product/${product.id}`, formData, options))
  }

  deleteProduct(product: any): Promise<any> {
    const options = {
      headers: new HttpHeaders().set("Authentication", "Bearer "+(localStorage.getItem("TOKEN") || ""))
    };
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/product/${product.id}`, options))
  }

  // Category Service

  getCategory(): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/category`))
  }

  createCategory(name: any, image: any): Promise<any> {
    const options = {
      headers: new HttpHeaders().set("Authentication", "Bearer "+(localStorage.getItem("TOKEN") || ""))
    };
    let formData = new FormData();
    formData.append("name", name)
    formData.append("profileImage", image)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/category`, formData, options))
  }

  searchCategory(id: any) {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/category/${id}`))
  }

  // Send Feedback

  sendFeedback(mail: any, details: any) {
    let formData = new FormData();
    formData.append("email", mail)
    formData.append("detail", details)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/contactus`, formData))
  }

  postSearchService(search: any) {
    let formData = new FormData()
    formData.append("query", search)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/search`, formData))
  }

  // Forgot Password

  forgetPassword(email: any) {
    let formData = new FormData()
    formData.append("email", email)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/auth/forgot_password`, formData))
  }

  // Get Chart
  getChart(): Promise<any> {
    const options = {
      headers: new HttpHeaders().set("Authentication", "Bearer "+(localStorage.getItem("TOKEN") || ""))
    };
    return lastValueFrom(this.http.get(`${environment.apiUrl}/chart`, options))
  }



}
