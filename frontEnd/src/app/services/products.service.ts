import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectProduct: any;
  constructor() { }

  products = [
    {
      id: 1,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    },

    {
      id: 2,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    },

    {
      id: 3,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    },

    {
      id: 4,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    },

    {
      id: 5,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    },

    {
      id: 6,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    },

    {
      id: 7,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    },

    {
      id: 8,
      category: 'shoes',
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      title: 'Shoe',
      price: 7
    }
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
      imageUrl: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg'
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
}

//imageUrl = 'https://media.istockphoto.com/photos/sneakers-with-clipping-path-picture-id175537625?b=1&k=20&m=175537625&s=170667a&w=0&h=3ayXmgvGE3zsRn2v4jJffLzyk3iyDsyqbTlrSVJxmu4='