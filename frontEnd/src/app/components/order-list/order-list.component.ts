import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "tr[app-order-list]",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit {
  @Input("order") order: any;
  @Output() change = new EventEmitter();
  @Output() sendDeleteOrder = new EventEmitter();
  @ViewChild("select") select!: ElementRef<HTMLSelectElement>;
  shippingList: any;
  timer: String = "Calculating...";
  orderLink!: any;
  isTimeout = false;
  xInterval!: any;
  orderIndex!: any;

  constructor(private orderService: OrderService, private router: Router) { }

  formatDate(time: number) {
    if (time < 0) {
      return null;
    }
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""
      } ${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  onChange() {
    this.isTimeout = false;
    if (
      this.order.order_status == "shipping" ||
      this.order.order_status == "pending"
    ) {
      this.createInterval();
    } else if (this.order.order_status == "cancel") {
      this.isTimeout = true;
      clearInterval(this.xInterval);
      this.timer = "Timeout";
      this.order.order_status = "cancel";
    } else {
      setTimeout(() => {
        this.timer = "---";
      }, 1000);
    }
    this.updateOrder(this.order._id, this.order);
  }

  styleChange(element: any) {
    if (element.value == "pending") {
      return "color:#2268d0; backgroundColor: #f2f4f8";
    } else if (element.value == "shipping") {
      return "color:#ffc107; backgroundColor: #fff7e6";
    } else if (element.value == "arrive") {
      return "color:#08b967; backgroundColor: #f2f4f8";
    } else {
      return "color:#ef0f24; backgroundColor: #f9ebeb";
    }
  }

  createInterval() {
    if (this.xInterval) {
      clearInterval(this.xInterval);
    }
    this.xInterval = setInterval(() => {
      if (
        this.order.order_status == "cancel" ||
        this.order.order_status == "arrive"
      ) {
        clearInterval(this.xInterval);
      }
      let customerBuyDate = new Date(this.order.date);
      let dateDiff = this.formatDate(
        new Date(
          customerBuyDate.setDate(customerBuyDate.getDate() + 1)
        ).getTime() - new Date().getTime()
      );
      if (dateDiff) {
        this.timer = dateDiff;
      } else {
        this.isTimeout = true;
        this.timer = "Timeout";
        this.order.order_status = "cancel";
        this.updateOrder(this.order._id, this.order);
        clearInterval(this.xInterval);
      }
    }, 1000);
  }

  async ngOnInit() {
    if (
      this.order.order_status == "shipping" ||
      this.order.order_status == "pending"
    ) {
      this.createInterval();
    } else if (this.order.order_status == "cancel") {
      this.isTimeout = true;
      clearInterval(this.xInterval);
      this.timer = "Timeout";
    } else {
      clearInterval(this.xInterval);
      this.timer = "---";
    }

    this.orderLink = `/order/detail/${this.order._id}`;
  }

  async updateOrder(id: string, data: any) {
    return await this.orderService.updateOrder(id, data);
  }

  deleteOrder() {
    this.orderService.order = this.order;
    this.sendDeleteOrder.emit(this.order);

    // return await this.orderService.deleteOrder(this.order._id);
  }

  ngAfterViewInit() {
    this.select.nativeElement.style.color = "#2268d0";
    this.select.nativeElement.style.backgroundColor = "#f2f4f8";

    if (this.order.order_status == "pending") {
      this.select.nativeElement.style.color = "#2268d0";
      this.select.nativeElement.style.backgroundColor = "#f2f4f8";
    }
    if (this.order.order_status == "shipping") {
      this.select.nativeElement.style.color = "#ffc107";
      this.select.nativeElement.style.backgroundColor = "#fff7e6";
    }
    if (this.order.order_status == "arrive") {
      this.select.nativeElement.style.color = "#08b967";
      this.select.nativeElement.style.backgroundColor = "#ebf9f4";
    }
    if (this.order.order_status == "cancel") {
      this.select.nativeElement.style.color = "#ef0f24";
      this.select.nativeElement.style.backgroundColor = "#f9ebeb";
    }
  }
}
