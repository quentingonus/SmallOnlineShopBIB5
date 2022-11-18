import { Injectable } from '@angular/core';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
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

  async orderFindbyCustomer(customerId: any) {
    const options = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + (localStorage.getItem('TOKEN') || '')
      ),
    };
    return lastValueFrom(
      this.http.get(
        `${environment.apiUrl}/purchase/user/${customerId}`,
        options
      )
    );
  }

  postCreateOrder(customer: any, order: any) {
    let formData = new FormData();
    let productArr: any = [];
    let quantityArr: any = [];

    order.products.forEach((item: any) => {
      productArr.push(item.id)
      quantityArr.push(item.amount)
    })

    formData.append("created_user_id", JSON.parse(localStorage.getItem("USER")!)._id)
    formData.append("productId", JSON.stringify(productArr))
    formData.append("quantity", JSON.stringify(quantityArr))
    formData.append("address", `${customer.address1}, ${customer.address2}, ${customer.city},  ${customer.zip}, ${customer.state}, ${customer.country}`)
    formData.append("credit", customer.payment)
    formData.append("date", "")
    formData.append("order_status", "pending")
    return lastValueFrom(this.http.post(`${environment.apiUrl}/purchase`, formData))
  }

  postGetOrder() {
    return lastValueFrom(
      this.http.get(`${environment.apiUrl}/purchase?page=1&chunk=1000`)
    );
  }

  postSearchOrder(id: String) {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/purchase/${id}`));
  }

  updateOrder(id: string, payload: any) {
    return lastValueFrom(
      this.http.put(`${environment.apiUrl}/purchase/${id}`, payload)
    );
  }

  deleteOrder(id: string) {
    return lastValueFrom(
      this.http.delete(`${environment.apiUrl}/purchase/${id}`)
    );
  }

  constructor(private http: HttpClient) {}
}
