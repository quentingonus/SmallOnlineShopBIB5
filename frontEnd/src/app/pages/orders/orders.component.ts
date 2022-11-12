import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})

export class OrdersComponent implements OnInit {
  orderLists: any;
  shippingList: any;
  arrivedList: any;
  fullTimer: any;

  constructor(public orderService: OrderService, private router: Router) {
    this.orderLists = orderService.order;
    this.shippingList = orderService.shippingList;
    this.arrivedList = orderService.arriveList;
  }

  viewOrder(order: any) {
    this.orderService.viewOrder = order;
    let index = this.orderService.order.indexOf(order);
    this.router.navigate(['/admin/order/detail/' + index]);

  }

  getShippingList(shippingList: any) {
    if (shippingList) {
      console.log('Shipping list', shippingList.value);
      this.shippingList = shippingList;
    }
  }

  addArrivedList(order: any) {
    this.arrivedList = this.orderService.addArrivedList(order);
  }

  async ngOnInit() {
    let orders = await this.orderService.postGetOrder()
    console.log(orders)
  }

}
