import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'tr[app-customer-order]',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {
  @Input('order') order: any;
  @Output() change = new EventEmitter();
  
  timer: String = "Calculating...";

  constructor(private orderService: OrderService, private router: Router) { }

  formatDate(time: number) {
    if (time < 0) {
      return null
    }
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`
  }

  viewOrder(order: any) {
    this.orderService.viewOrder = order;
    let index = this.orderService.order.indexOf(order);
    this.router.navigate(['/admin/order/detail/' + index]);

  }


  ngOnInit(): void {
    setInterval(() => {
      let customerBuyDate = new Date(this.order.customer.date)
      let dateDiff = this.formatDate(new Date(customerBuyDate.setDate(customerBuyDate.getDate() + 1)).getTime() - new Date().getTime());
      this.timer = dateDiff ? dateDiff : "Timeout"
    }, 1000)
  }

}
