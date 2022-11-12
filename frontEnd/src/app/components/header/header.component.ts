import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  cartItem!: any;

  burgurMenu = false;

  navItems1 = [
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
  ]

  navItems2 = [
    {
      name: "Home",
      route: "/"
    },
    {
      name: "Categories",
      route: "/categories"
    },
    {
      name: "Logout",
      route: "/logout",
    },
  ]

  constructor(
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private cart: CartService,
    private headerService: HeaderService,
    private authService: AuthService
  ) { }


  openCart(content: any) {
    return this.headerService.openCanvas(content, "end")
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
    this.headerService.openCanvas(content, "end").result.then(
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

  checkAdmin() {
    return this.authService.isAdmin()
  }

  getNav() {
    if (this.authService.isAuthenticated()) {
      return this.navItems2
    } else {
      return this.navItems1
    }
  }

  checkout(offcanvas: any) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/check-out"])
    } else {
      this.router.navigate(
        ['/login'],
        { queryParams: { redirect: "check-out" } }
      );
    }
    offcanvas.dismiss()
  }

  ngOnInit(): void {
    this.cart.getCart().subscribe((item: any) => {
      this.cartItem = item
    })
  }

}
