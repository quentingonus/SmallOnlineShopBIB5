import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAddToCart = false;
  responsiveOptions;
  cart: any[] = [];

  products = [
    {
      id: 1,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 2,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 3,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 4,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 5,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 6,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 7,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 8,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 9,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

    {
      id: 10,
      category: 'shoes',
      imageUrl: 'https://img.freepik.com/premium-photo/running-shoes-white-background_10541-635.jpg?w=2000',
      title: 'Shoe',
      price: 7
    },

  ]; 

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
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(library: FaIconLibrary, config: NgbCarouselConfig) { 
    library.addIcons(faPlus, faMinus);
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;

    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 3
  }];
  }

  onClick(product:any) {
    this.isAddToCart = !this.isAddToCart;
    console.log(product);

    if (this.cart.length > 0) {
      const index = this.cart.findIndex(_product => {
        _product.id == product.id
      });
  
      if (index != -1) {
        console.log('Found')
        product.quantity = +1;
      }
  
      else {
        console.log('Not Found')
        this.cart.push(product);
      }
    }

    else {
      this.cart.push(product);
    }
    

    console.log(this.cart)

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
