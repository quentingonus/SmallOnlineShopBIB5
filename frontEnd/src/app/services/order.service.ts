import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //order: any = {
  //  customer: [],
  //  orderProduct: []
  //};

  order: any[] = [];
  viewOrder: any;

  private shippingList: any[] = [];
  private arriveList: any[] = [];

//  today: any;
//  tomorrow = new Date();
//  endTime: any;
//  remainingTime: any;
//  hours: any;
//  minutes: any;
//  seconds: any;
//  timeleft = 6;
//  timer$ = new Subject();
//
//  shippingCounter: any;
//
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
//
//  get fullTimer() {
//    let timer = `${this.hours} hours ${this.minutes} minutes ${this.seconds}`
//
//    return timer;
//  }

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

  constructor() {
    //if (this.today) {
    //  console.log('Today: ', this.today);
    //  console.log('Tomorrow: ', this.tomorrow);
    //}
    //

    //this.Timer(new Date()).subscribe(timer => console.log(timer));
  }
}
