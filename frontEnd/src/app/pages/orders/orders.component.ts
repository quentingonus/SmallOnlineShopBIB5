import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderLists: any;
  constructor(orderService: OrderService) {
    this.orderLists = orderService.orderList;
   }

  ngOnInit(): void {
  }

}
