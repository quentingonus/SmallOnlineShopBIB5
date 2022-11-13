import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @ViewChild('select') select!: ElementRef<HTMLSelectElement>;
  shippingList: any;
  timer: String = "Calculating...";
  orderLink!: any;

  constructor(private orderService: OrderService, private router: Router) { }

  viewOrder() {
    console.log(this.order)
    this.router.navigate([`/admin/order/detail/${this.order._id}`]);
  }
  addShippingList(order: any) {
    this.shippingList = this.orderService.addShippingList(order);
    console.log(this.shippingList);
    this.change.emit(this.shippingList);
  }

  formatDate(time: number) {
    if (time < 0) {
      return null
    }
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`
  }

  onChange(element: any) {

    if (element.value == 'pending') {
      this.select.nativeElement.style.color = '#2268d0';
      this.select.nativeElement.style.backgroundColor = '#f2f4f8';
    }
    if (element.value == 'shipping') {
      this.select.nativeElement.style.color = '#ffc107';
      this.select.nativeElement.style.backgroundColor = '#fff7e6';
    }
    if (element.value == 'arrive') {
      this.select.nativeElement.style.color = '#08b967';
      this.select.nativeElement.style.backgroundColor = '#ebf9f4';
    }
    if (element.value == 'cancel') {
      this.select.nativeElement.style.color = '#ef0f24';
      this.select.nativeElement.style.backgroundColor = '#f9ebeb';
    }
  }

  ngOnInit(): void {
    let x = setInterval(() => {
      let customerBuyDate = new Date(this.order.date)
      let dateDiff = this.formatDate(new Date(customerBuyDate.setDate(customerBuyDate.getDate() + 1)).getTime() - new Date().getTime());
      this.timer = dateDiff ? dateDiff : "Timeout"

      if (!dateDiff) clearInterval(x);
    }, 1000)
  this.orderLink = `/admin/order/detail/${this.order._id}`
  console.log(this.orderLink)
}

  ngAfterViewInit() {
    this.select.nativeElement.style.color = '#2268d0';
    this.select.nativeElement.style.backgroundColor = '#f2f4f8';
  }

}
