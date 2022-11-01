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
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 2,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 3,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 4,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 5,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 6,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 7,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 8,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 9,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

    {
      id: 10,
      category: 'shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4=',
      title: 'Shoe',
      price: 7
    },

  ]; 

  categories = [
    {
      title: 'Phones',
      imageUrl: 'http://cdn.shopify.com/s/files/1/0482/6189/0203/products/dd2fb7e9-c955-47d5-b894-770ffb6c44c0.jpg?v=1666110800'
    },

    {
      title: 'Washing Machine',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/006/600/010/original/washing-machine-isolated-on-white-background-free-vector.jpg'
    },

    {
      title: 'Shoes',
      imageUrl: 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4='
    },

    {
      title: 'Clothes',
      imageUrl: 'https://i.pinimg.com/originals/1f/db/1d/1fdb1d531cd5e358db9b297997acdec5.jpg'
    },

    {
      title: 'Tablets',
      imageUrl: 'https://www.fonewalls.com/wp-content/uploads/2020/03/Apple-iPad-Pro-12.9-2020.jpg'
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
    this.isAddToCart = this.isAddToCart;
    console.log(product.id);

    if (this.cart.length > 0) {
      const index = this.cart.findIndex(value => {
        value.id == product.id;

        console.log('Product: ', value.id)
      });

      console.log('Index :', index);
      
  
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
