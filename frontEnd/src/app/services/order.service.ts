import { Injectable } from '@angular/core';

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

  
  today: any;
  tomorrow = new Date();
  endTime: any;
  remainingTime: any;
  hours: any;
  minutes: any;
  seconds: any;
  timeleft = 6;

  Timer() {
    let countdown = setInterval(() => {
      this.timeleft -= 1;
      console.log('Time Left:', this.timeleft);

      if (this.timeleft == 0) {
        clearInterval(countdown)
        console.log("shipping ...");

        let x = setInterval(() => {
          let today = new Date().getTime();
          this.remainingTime = (this.endTime) - today;
    
          this.hours = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
    
          console.log(`Hours:${this.hours} minutes:${this.minutes} seconds:${this.seconds}`)
    
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
    this.tomorrow.setDate(this.today.getDate() + 1)
    this.endTime = this.tomorrow.getTime();

    console.log('Today: ', this.today);
    console.log('Tomorrow: ', this.tomorrow);
    this.Timer();
  }
}
