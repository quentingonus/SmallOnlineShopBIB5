import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  selectProduct: any;
  products: any;
  category: any[] = [];

  constructor() {}

  addProduct(product: any) {
    let id = this.products.length;
    let newProduct = { id: ++id, ...product };

    this.products.push(newProduct);

    console.log('New Product :', newProduct);
    console.log('Products :', this.products);
  }

  editProduct(product: any) {
    let index = this.products.indexOf(this.selectProduct);
    let newProduct = {
      id: this.selectProduct.id,
      amount: this.selectProduct.amount,
      ...product,
    };
    this.products.splice(index, 1, newProduct);
  }

  deleteData(product: any) {
    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
    console.log(product);
  }
}
