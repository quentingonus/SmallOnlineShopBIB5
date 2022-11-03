import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  products: any;
  constructor(private productService: ProductsService, private router: Router) {
    this.products = productService.products;
  }


  deleteProduct(product: any) {
    this.productService.deleteData(product);
  }

  editProduct(product: any) {
    this.productService.selectProduct = product;
    this.router.navigate(['/admin/edit-product'])
  } 

  ngOnInit(): void {
  }

}
