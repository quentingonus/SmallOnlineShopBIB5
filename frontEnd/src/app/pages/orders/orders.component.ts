import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})

export class OrdersComponent implements OnInit {
  orderLists: any;
  shippingList: any;
  arrivedList: any;
  fullTimer: any;

  constructor(public orderService: OrderService, private router: Router) {
    this.orderLists = orderService.order;
    this.shippingList = orderService.shippingList;
    this.arrivedList = orderService.arriveList;
  }

  viewOrder(order: any) {
    this.orderService.viewOrder = order;
    let index = this.orderService.order.indexOf(order);
    this.router.navigate(['/admin/order/detail/' + index]);

  }

  getShippingList(shippingList: any) {
    if (shippingList) {
      console.log('Shipping list', shippingList.value);
      this.shippingList = shippingList;
    }
  }

  makeDownloadInCSV(data: any) {
    let newData = data.map((item: any) => {
      return {
        _id: item._id,
        created_user_id: item.created_user_id._id,
        productId: item.productId,
        quantity: item.quantity,
        address: item.address,
        credit: item.credit,
        date: item.date,
        order_status: item.order_status
      }
    })
    return this.downloadInCSV(newData)
  }

  downloadInCSV(data: Array<any>) {
    if (data.length == 0) {
      return;
    }

    let propertyNames = Object.keys(data[0]);
    let rowWithPropertyNames = propertyNames.join(',') + '\n';

    let csvContent = rowWithPropertyNames;

    let rows: string[] = [];

    data.forEach((item) => {
      let values: string[] = [];

      propertyNames.forEach((key) => {
        let val: any = item[key];

        if (val !== undefined && val !== null) {
          val = new String(val);
        } else {
          val = '';
        }
        values.push(val);
      });
      rows.push(values.join(','));
    });
    csvContent += rows.join('\n');

    var tmp = document.createElement('a');
    tmp.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    tmp.target = '_blank';
    tmp.download = 'ordersList.csv';
    tmp.click();
    return
  }

  addArrivedList(order: any) {
    this.arrivedList = this.orderService.addArrivedList(order);
  }

  async ngOnInit() {
    let orders: any = await this.orderService.postGetOrder()
    this.orderLists = orders.data
  }

}
