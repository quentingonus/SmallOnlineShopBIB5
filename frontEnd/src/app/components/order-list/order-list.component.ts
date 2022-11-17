import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'tr[app-order-list]',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input('order') order: any;
  @Output() change = new EventEmitter();
  @ViewChild('select') select!: ElementRef<HTMLSelectElement>;
  shippingList: any;
  timer: String = 'Calculating...';
  orderLink!: any;
  isTimeout = false;

  constructor(private orderService: OrderService, private router: Router) { }

  addShippingList(order: any) {
    this.shippingList = this.orderService.addShippingList(order);
    console.log(this.shippingList);
    this.change.emit(this.shippingList);
  }

  formatDate(time: number) {
    if (time < 0) {
      return null;
    }
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''
      } ${seconds} second${seconds > 1 ? 's' : ''}`;
  }

  onChange() {
    this.isTimeout = false;

    if (this.order.order_status == 'cancel')
      this.isTimeout = true;

    console.log('Orders From Status', this.order);
    //let data = { order_status: element.value };
    this.updateOrder(this.order._id, this.order);
  }

  styleChange(element: any) {
    if (element.value == 'pending') {
      return "color:#2268d0; backgroundColor: #f2f4f8"
    }
    else if (element.value == 'shipping') {
      return "color:#ffc107; backgroundColor: #fff7e6"
    }
    else if (element.value == 'arrive') {
      return "color:#08b967; backgroundColor: #f2f4f8"
    }
    else {
      return "color:#ef0f24; backgroundColor: #f9ebeb"
    }
  }

  async ngOnInit() {

    let x = setInterval(() => {
      let customerBuyDate = new Date(this.order.date);
      let dateDiff = this.formatDate(
        new Date(
          customerBuyDate.setDate(customerBuyDate.getDate() + 1)
        ).getTime() - new Date().getTime()
      );
      this.timer = dateDiff ? dateDiff : 'Timeout';

      if (this.timer == 'Timeout') {
        this.order.order_status = 'cancel';
        this.isTimeout = true;
        this.updateOrder(this.order._id, this.order);
      }

      if (!dateDiff) clearInterval(x);
    }, 1000);

    if (this.order.order_status == 'arrive') {
      clearInterval(x)
      this.timer = "---"
    }

    this.orderLink = `/admin/order/detail/${this.order._id}`;
  }

  async updateOrder(id: string, data: any) {
    console.log('Order ID', id);
    console.log('Order Data', data);
    return await this.orderService.updateOrder(id, data);
  }

  async deleteOrder(id: string) {
    return await this.orderService.deleteOrder(id);
  }

  ngAfterViewInit() {
    this.select.nativeElement.style.color = '#2268d0';
    this.select.nativeElement.style.backgroundColor = '#f2f4f8';

    if (this.order.order_status == 'pending') {
      this.select.nativeElement.style.color = '#2268d0';
      this.select.nativeElement.style.backgroundColor = '#f2f4f8';
    }
    if (this.order.order_status == 'shipping') {
      this.select.nativeElement.style.color = '#ffc107';
      this.select.nativeElement.style.backgroundColor = '#fff7e6';
    }
    if (this.order.order_status == 'arrive') {
      this.select.nativeElement.style.color = '#08b967';
      this.select.nativeElement.style.backgroundColor = '#ebf9f4';
    }
    if (this.order.order_status == 'cancel') {
      this.select.nativeElement.style.color = '#ef0f24';
      this.select.nativeElement.style.backgroundColor = '#f9ebeb';
    }
  }
}
