import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { FormControl } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  isFavorite = false;
  product: any;
  productAmount: any;

  constructor(
    library: FaIconLibrary,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private headerService: HeaderService
  ) {
    library.addIcons(faHeart, faHeartBroken);
    if (!this.productService.selectProduct) {
      this.router.navigate(['/home']);
    }
    this.product = this.productService.selectProduct;
    if (!('amount' in this.product)) {
      this.product.amount = 0;
    }
    this.productAmount = new FormControl(1);
  }

  addItem() {
    this.product.amount += this.productAmount.value;
    this.cartService.addToCart(this.product);
    this.productAmount.setValue(1);
  }

  ngOnInit(): void {}
}
