import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/header.service';
import { PostService } from 'src/app/services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  cartItem!: any;

  burgurMenu = false;

  searchText = ""

  navItem = [
    {
      name: "Home",
      route: "/"
    },
    {
      name: "Categories",
      route: "/categories"
    }
  ]

  currentUser!: any;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private cart: CartService,
    private headerService: HeaderService,
    private authService: AuthService,
    private modalService: NgbModal
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
    product.amount ? product.amount++ : 1;
    return this.cart.updateCart(product)
  }

  //Reduce the item
  reduceItem(product: any) {
    if (product.amount < 0) {
      return
    }
    product.amount--
    if (product.amount == 0) {
      return this.cart.removeFromCart(product)
    }
    return this.cart.updateCart(product)
  }

  checkAdmin() {
    return this.authService.isAdmin()
  }

  isLoggedIn() {
    return this.authService.isAuthenticated()
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("USER")!) || null
  }

  getNav() {
    let tmpNav = [...this.navItem]
    if (!this.isLoggedIn()) {
      tmpNav.push({
        name: "Login",
        route: "/login"
      })
    }
    return tmpNav
  }

  openSearch(content: any) {
    this.modalService.open(content)
  }

  startSearch(modal: any) {
    modal.close()
    if (!this.searchText.length) {
      return
    }
    this.router.navigate(
      ['/search'],
      { queryParams: { q: this.searchText } }
    );
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
    this.currentUser = JSON.parse(localStorage.getItem("USER")!)
    this.cart.getCart().subscribe((item: any) => {
      this.cartItem = item
    })
  }

}
