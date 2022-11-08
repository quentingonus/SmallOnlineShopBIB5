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

  burgurMenu = false;

  navItems = [
    {
      name: "Home",
      route: "/"
    },
    {
      name: "Categories",
      route: "/categories"
    },
    {
      name: "Login",
      route: "/login"
    },
    {
      name: "Contact",
      route: "/contact"
    }
  ]

  constructor(private offcanvasService: NgbOffcanvas, private cart: CartService) { }


  openCart(content: any) {
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
      totalAmount += (item.price * item.amount)
    })
    return totalAmount
  }

  removeFromCart(item: any) {
    this.cart.removeFromCart(item)
  }

  openBurgurMenu(content: any) {
    this.burgurMenu = !this.burgurMenu
    this.offcanvasService.open(content, { position: 'end' }).result.then(
      (result) => {
        this.burgurMenu = !this.burgurMenu
      },
      (reason) => {
        this.burgurMenu = !this.burgurMenu
      },
    );
  }

  addItem(product: any) {
    return product.amount ? product.amount++ : 1;
  }

  reduceItem(product: any) {
    if (product.amount < 0) {
      return
    }
    product.amount--
    if (product.amount == 0) {
      this.cart.removeFromCart(product)
    }
  }

  ngOnInit(): void {
    this.cart.getCart().subscribe(item => {
      this.cartItem = item
    })
  }

}
