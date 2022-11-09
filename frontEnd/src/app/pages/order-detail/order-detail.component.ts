import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  customer: any;
  orderProduct: any;
  fulltime: any;
  constructor(private orderService: OrderService, private router: Router) {
    this.customer = orderService.viewOrder.customer;
    this.orderProduct = orderService.viewOrder.orderProduct;
   }

  get fullname() {
    return this.customer.fname + ' ' + this.customer.lname;
  }

  ngOnInit(): void {
    if (this.orderService.order.length == 0) this.router.navigate(['/admin/order']);
    this.orderService.Timer();
    this.fulltime = this.orderService.fullTimer;
    
  }

}
