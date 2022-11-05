import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  products: any;
  constructor(private productService: ProductsService, private router: Router, private cartService: CartService, private postService: PostService) {
  }


  async deleteProduct(product: any) {
    await this.postService.deleteProduct(product)
    this.products.splice(this.products.indexOf(product), 1)
  }

  editProduct(product: any) {
    this.productService.selectProduct = product;
    this.router.navigate(['/admin/edit-product'])
  }

  async ngOnInit() {
    this.products = await this.cartService.getShop();
  }

}
