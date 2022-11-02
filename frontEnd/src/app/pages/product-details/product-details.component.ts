import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  isFavorite = false;
  product: any;
  constructor(library: FaIconLibrary, private productService: ProductsService, private cartService: CartService) {
    library.addIcons(faHeart, faHeartBroken);
    this.product = this.productService.selectProduct;
    console.log(this.product);
  }
  
  addItem() {
    console.log('Button Clicked')
    if (!this.productService.selectProduct.amount) {
      this.productService.selectProduct.amount = 0;
      console.log(this.productService.selectProduct);
      this.cartService.cartItem$.next(this.productService.selectProduct);
    }
    this.productService.selectProduct.amount++;
  }

  changeValue(event: any) {
    console.log('changeValue')
    if (event.target.value == 0) 
      return this.cartService.removeFromCart(this.product)
    
    this.cartService.addToCart(this.product);
  
  }

  ngOnInit(): void {}

}
