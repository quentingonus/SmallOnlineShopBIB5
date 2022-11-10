import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  }

  viewOrder(order: any) {
    this.orderService.viewOrder = order;
    let index = this.orderService.order.indexOf(order);
    this.router.navigate(['/admin/order/detail/' + index]);

  }

  addShippingList(order: any) {
    this.shippingList = this.orderService.addShippingList(order);
  }

  addArrivedList(order: any) {
    this.arrivedList = this.orderService.addArrivedList(order);
  }

  //async getfullTimer(order: any) {
  //  let fulltime$ = new Subject();
  //  this.orderService.Timer(order.customer.date).subscribe(timer => { 
  //    fulltime$.next(timer);
  //  });
  //  
  //  return fulltime$.asObservable();
  //}

  ngOnInit(): void {
  }

}
