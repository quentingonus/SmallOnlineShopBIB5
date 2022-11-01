import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAddToCart = false;
  cart: any[] = [];

  products: any;

  categories: any;

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "arrow": true,
    "autoplay": true,
    "interval": 2000,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(library: FaIconLibrary, config: NgbCarouselConfig, productService: ProductsService, private cartService: CartService) {
    library.addIcons(faPlus, faMinus);
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;

    this.products = productService.products;
    this.categories = productService.categories;
  }

  onClick(product: any) {
    this.cartService.addToCart(product)
    //    this.isAddToCart = !this.isAddToCart;
    //    console.log(product.id);
    //
    //    if (this.cart.length > 0) {
    //      const index = this.cart.findIndex(value => {
    //        value.id == product.id;
    //
    //        console.log('Product: ', value.id)
    //      });
    //
    //      console.log('Index :', index);
    //
    //
    //      if (index != -1) {
    //        console.log('Found')
    //        product.quantity = +1;
    //      }
    //
    //      else {
    //        console.log('Not Found')
    //        this.cart.push(product);
    //      }
    //    }
    //
    //    else {
    //      this.cart.push(product);
    //    }
    //
    //
    //    console.log(this.cart)

  }
  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  ngOnInit(): void {
  }

}
