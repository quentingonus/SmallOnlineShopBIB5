import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: any[] = [
    {
        "customer": {
            "date": "2022-11-10T07:17:36.789Z",
            "fname": "sdfs",
            "lname": "dfdf",
            "username": "PhyoThiHA",
            "email": "sdfs",
            "address1": "sdfsdf",
            "address2": "sdf",
            "country": "sdfsf",
            "state": "dfsdfs",
            "zip": "df",
            "sameaddress": true,
            "remember": null,
            "payment": "credit",
            "card_name": "sdfs",
            "card_number": "dsff"
        },
        "orderProduct": [
            {
                "totalPrice": 12.99,
                "id": "636b5cccf7f237c39bbcf3c2",
                "title": "ကြက်ဥကြော် (ရှယ်)",
                "imageUrl": "http://localhost:3000/apiuploads/876f92ce-96b6-4ddb-a457-f7ede62367c2_food_poisoning_egg_gastroenteritis_1296x728_header-1024x575.jpg",
                "price": 12.99,
                "amount": 1,
                "category": "food"
            }
        ]
    },
    {
        "customer": {
            "date": "2022-11-10T07:17:36.789Z",
            "fname": "sdfs",
            "lname": "dfdf",
            "username": "PhyoThiHA0805",
            "email": "sdfs",
            "address1": "sdfsdf",
            "address2": "sdf",
            "country": "sdfsf",
            "state": "dfsdfs",
            "zip": "df",
            "sameaddress": true,
            "remember": null,
            "payment": "credit",
            "card_name": "sdfs",
            "card_number": "dsff"
        },
        "orderProduct": [
            {
                "totalPrice": 12.99,
                "id": "636b5cccf7f237c39bbcf3c2",
                "title": "ကြက်ဥကြော် (ရှယ်)",
                "imageUrl": "http://localhost:3000/apiuploads/876f92ce-96b6-4ddb-a457-f7ede62367c2_food_poisoning_egg_gastroenteritis_1296x728_header-1024x575.jpg",
                "price": 12.99,
                "amount": 1,
                "category": "food"
            }
        ]
    }
];
  viewOrder: any;

  shippingList: any[] = [];
  arriveList: any[] = [];
  
  timer: any;

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

  orderFindbyCustomer(customer: any) {
    let order = this.order.filter(order => order.customer.username == customer)
    return order;
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
