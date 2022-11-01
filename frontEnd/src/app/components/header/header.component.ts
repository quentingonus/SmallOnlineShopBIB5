import { Component, OnInit, Input } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartItem!: any;

  constructor(private offcanvasService: NgbOffcanvas, private cart: CartService) { }

  open(content: any) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'cart-details', position: 'end' });
  }

  totalCartItem() {
    if (!this.cartItem) {
      return 0
    }
    let totalAmount = 0
    this.cartItem.map((item: any) => {
      totalAmount += item.amount
    })
    return totalAmount
  }

  totalAmount() {
    if (!this.cartItem) {
      return 0
    }
    let totalAmount = 0
    this.cartItem.map((item: any) => {
      totalAmount += item.price
    })
    return totalAmount
  }

  ngOnInit(): void {
    this.cart.getCart().subscribe(item => {
      this.cartItem = item
    })
  }

}
