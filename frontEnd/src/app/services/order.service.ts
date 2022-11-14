import { Injectable } from '@angular/core';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: any[] = [];
  viewOrder: any;

  shippingList: any[] = [];
  arriveList: any[] = [];

  addShippingList(order: any) {
    let index = this.order.indexOf(order);
    this.order.splice(index, 1);
    this.shippingList.push(order);
    console.log('ShipOder ', order);

    return this.shippingList;
  }

  addArrivedList(order: any) {
    let index = this.shippingList.indexOf(order);
    this.shippingList.splice(index, 1);
    this.arriveList.push(order);

    return this.arriveList;
  }

  orderFindbyCustomer(customer: any) {
    let order = this.order.filter(order => order.customer.username == customer)
    return order;
  }


  postCreateOrder(customer: any, order: any) {
    let formData = new FormData()
    let productArr: any = []
    let quantityArr: any = []

    order.products.forEach((item: any) => {
      productArr.push(item.id)
      quantityArr.push(item.amount)
    })

    formData.append("created_user_id", JSON.parse(localStorage.getItem("USER")!)._id)
    formData.append("productId", JSON.stringify(productArr))
    formData.append("quantity", JSON.stringify(quantityArr))
    formData.append("address", `${customer.address1}, ${customer.address2}, ${customer.state}, ${customer.zip}, ${customer.country}`)
    formData.append("credit", customer.payment)
    formData.append("date", new Date().toLocaleString())
    formData.append("order_status", "pending")
    return lastValueFrom(this.http.post(`${environment.apiUrl}/purchase`, formData))
  }

  postGetOrder() {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/purchase`))
  }

  postSearchOrder(id: String) {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/purchase/${id}`))
  }

  constructor(private http: HttpClient) {
  }
}
