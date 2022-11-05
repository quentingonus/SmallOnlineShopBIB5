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

  getProducts(): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/product`))
  }

  async getCategories() {
    let products = await this.getProducts()

    // Temporary adding all to shoe category
    products.data.map((item: any) => {
      return item.category = "shoe"
    })

    return products.length ? [] : this.util.getKeyArr(this.util.modifyCategory(products.data))
  }

  createProducts(product: any): Promise<any> {
    let formData = new FormData();

    //Temporary Adding Default Value
    formData.append("created_user_id", "6365850d18aa12bc2b615e33")

    formData.append("title", product.title)
    formData.append("price", product.price)
    formData.append("profileImage", product.imageUrl)

    return lastValueFrom(this.http.post(`${environment.apiUrl}/product`, formData))
  }

  updateProducts(product: any): Promise<any> {
    let formData = new FormData();

    //Temporary Adding Default Value
    formData.append("created_user_id", "6365850d18aa12bc2b615e33")

    formData.append("title", product.title)
    formData.append("price", product.price)
    formData.append("profileImage", product.imageUrl)

    return lastValueFrom(this.http.put(`${environment.apiUrl}/product/${product.id}`, formData))
  }

  deleteProduct(product: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/product/${product.id}`))
  }


}
