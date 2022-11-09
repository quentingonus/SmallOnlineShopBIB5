import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

  
  today : any;
  tomorrow = new Date();
  endTime: any;
  remainingTime: any;
  hours: any;
  minutes: any;
  seconds: any;
  timeleft = 6;   
  timer$ = new Subject();

  shippingCounter: any;
  Timer(today: any) {
    this.today = today;
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.endTime = this.tomorrow.getTime();

    let countdown = setInterval(() => {
      this.shippingCounter = true;
      this.timeleft -= 1;
      console.log('Time Left:', this.timeleft);

      if (this.timeleft == 0) {
        clearInterval(countdown)
        this.shippingCounter = false;

        let x = setInterval(() => {
          let todayTime =new Date().getTime();
          this.remainingTime = (this.endTime) - todayTime;
    
          this.hours = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
    
          this.timer$.next(`Hours:${this.hours} minutes:${this.minutes} seconds:${this.seconds}`);
          this.timer$.subscribe(timer => console.log(timer));
    
          if (this.remainingTime < 0) {
            clearInterval(x);
            this.remainingTime = 0;
    
            console.log('Timeout');
          }
        }, 1000);
      }
    }, 1000);

  }

  get fullTimer() {
    let timer = `${this.hours} hours ${this.minutes} minutes ${this.seconds}`

    return timer;
  }

  
  constructor() {
    if (this.today) {
      console.log('Today: ', this.today);
      console.log('Tomorrow: ', this.tomorrow);   
    }
  }
}
