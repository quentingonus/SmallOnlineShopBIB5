import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAddToCart = false;
  cart: any[] = [];
  products: any;
  popularProduct: any;

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

  constructor(
    library: FaIconLibrary,
    config: NgbCarouselConfig,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private util: UtilsService,
    private postService: PostService
  ) {
    library.addIcons(faPlus, faMinus);
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;

    this.getData()
    this.cartService.getCart().subscribe(data => this.cart = data);
  }

  async getData() {
    let category = await this.postService.getCategory()
    this.products = await this.cartService.getShop();
    this.categories = await this.cartService.getCategory();
    this.products.map((item: any) => {
      item.category = this.util.searchCategory(item.category, category.data)
      return item
    })
    let popular = await this.postService.getPopular()
    let newPop: any = []
    popular = popular.data.map((item: any) => {
      for (let i of this.products) {
        if (item[0] == i.id) {
          i.order = item[1]
          newPop.push(i)
        }
      }
    })
    if (newPop.length == 4) {
      newPop = newPop
    }
    else if (newPop.length < 4) {
      newPop += this.util.getRandomFromArray(this.products, (4 - newPop.length))
    } else {
      newPop.splice(4)
    }
    this.popularProduct = newPop
    console.log(this.popularProduct)
  }

  goToCategory(category: any) {
    this.router.navigate([`categories/${category.id}`])
  }

  onClick(product: any) {
    this.cartService.addToCart(product);
    //this.isAddToCart = !this.isAddToCart;
  }

  addItem(product: any) {
    let index = this.cart.indexOf(product);
    this.cart[index].amount++;
    this.cartService.cartItem$.next(this.cart);
  }

  removeItem(product: any) {
    let index = this.cart.indexOf(product);
    this.cart[index].amount--;
    //this.cartService.cartItem$.next(this.cart);
  }

  getAmount(product: any) {
    let index = this.cart.indexOf(product);
    if (this.cart.length > 0) {
      let item = this.cart[index].amount;
      return (item ? item : 0);
    }

    else {
      return 0;
    }

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
