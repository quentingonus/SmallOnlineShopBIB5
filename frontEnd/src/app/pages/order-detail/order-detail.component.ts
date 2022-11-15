import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  customer: any;
  order: any;
  fulltime: any;
  orderId!: String;
  orderProducts: any = []
  categories!: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private util: UtilsService
  ) {
  }

  totalPrice(orderProducts: any) {
    if (!orderProducts) {
      return 0;
    }
    let totalPrice = 0;
    orderProducts.map((item: any) => {
      totalPrice += item.price * item.amount;
    });
    //if (hasPromo) {
    //  let discountPrice = (this.discount / 100) * totalPrice;
    //  return totalPrice - ((discount / 100) * totalPrice);
    //}

    return totalPrice;
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params['id'];
    });
    this.order = await this.orderService.postSearchOrder(this.orderId)
    this.categories = await this.postService.getCategory();
    const products = await this.cartService.getShop()
    products.forEach((item: any) => {
      let index = this.order.data.productId.indexOf(item.id)
      if (index > -1) {
        item.amount = this.order.data.quantity[index]
        item.category = this.util.searchCategory(item.category, this.categories.data)
        this.orderProducts.push(item)
      }
    })
  }

}
