import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() cardItem!: any;

  onClick(product: any) {
    return this.cartService.addToCart(product);
  }

  addItem(product: any) {
    product.amount ? product.amount++ : 1;
    return this.cartService.updateCart(product)
  }

  removeItem(product: any) {
    if (product.amount < 0) {
      return
    }
    product.amount--
    if (product.amount == 0) {
      this.cartService.removeFromCart(product)
    }
    this.cartService.updateCart(product)
  }

  getAmount(product: any) {
    return product.amount ? product.amount : 0;
  }

  showDetail() {
    this.productService.selectProduct = this.cardItem;
    this.router.navigate(['/products/detail']);
  }

  constructor(library: FaIconLibrary, private cartService: CartService, private productService: ProductsService, private router: Router) {
    library.addIcons(faPlus, faMinus);
  }

  ngOnInit(): void {
    let cartNormal = this.cartService.getCartNormal()
    for (let i = 0; i < cartNormal.length; i++) {
      if (cartNormal[i].id == this.cardItem.id) {
        this.cardItem.amount = cartNormal[i].amount
        break
      } else {
        this.cardItem.amount = 0
      }
    }
  }

}
