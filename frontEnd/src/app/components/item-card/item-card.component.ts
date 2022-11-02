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
    return product.amount ? product.amount++ : 1;
  }

  removeItem(product: any) {
    if (product.amount < 0) {
      return
    }
    product.amount--
    if (product.amount == 0) {
      this.cartService.removeFromCart(product)
    }
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

    productService.selectProduct = this.cardItem;
  }

  ngOnInit(): void {
  }

}
