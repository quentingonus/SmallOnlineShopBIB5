import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'tr[app-order-list]',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @Input('order') order: any;
  @Output() change = new EventEmitter();
  shippingList: any;
  timer: String = "Calculating...";

  constructor(private orderService: OrderService, private router: Router) { }

  viewOrder(order: any) {
    this.orderService.viewOrder = order;
    let index = this.orderService.order.indexOf(order);
    this.router.navigate(['/admin/order/detail/' + index]);

  }
  addShippingList(order: any) {
    this.shippingList = this.orderService.addShippingList(order);
    console.log(this.shippingList);
    this.change.emit(this.shippingList);
  }

//  Timer(orderday: any) {
//    this.today = new Date(orderday);
//    //console.log('Today:', this.today);
//
//    this.tomorrow.setDate(this.today.getDate() + 1);
//    //console.log('Tomorrow:', this.tomorrow)
//    this.endTime = this.tomorrow.getTime();
//
//    let x = setInterval(() => {
//      let overtime = new Date().getTime();
//      this.remainingTime = (this.endTime) - overtime;
//
//      if (this.remainingTime > 0) {
//        this.hours = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//        this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//        this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
//
//        this.timer$.next(`${this.hours}:${this.minutes}:${this.seconds}`);
//        return this.timer$;
//      }
//
//      clearInterval(x);
//      this.remainingTime = 0;
//
//      this.timer$.next('Timeout');
//      return this.timer$;
//
//    }, 1000);
//
//    return this.timer$;
//  }

//  get fullTimer() {
//    let timer = `${this.hours} hours ${this.minutes} minutes ${this.seconds}`
//
//    return timer;
//  }

  formatDate(time: number) {
    if (time < 0) {
      return null
    }
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`
  }


  ngOnInit(): void {
   let x = setInterval(() => {
      let customerBuyDate = new Date(this.order.customer.date)
      let dateDiff = this.formatDate(new Date(customerBuyDate.setDate(customerBuyDate.getDate() + 1)).getTime() - new Date().getTime());
     this.timer = dateDiff ? dateDiff : "Timeout"
     console.log(this.timer);

     if (!dateDiff) clearInterval(x);
    }, 1000)
  }

}
