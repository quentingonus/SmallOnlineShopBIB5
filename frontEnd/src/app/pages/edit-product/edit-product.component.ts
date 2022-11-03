import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  form;
  id: any;
  category: any;
  isConfirm: boolean = false;
  selectProduct: any;

  constructor(private productService: ProductsService, private fb: FormBuilder, private router: Router) {
    this.category = this.productService.category;
    this.selectProduct = this.productService.selectProduct;

    if (!this.selectProduct) {
      router.navigate(['/admin']);
    }

    this.form = fb.group({
      title: [this.selectProduct.title, Validators.required],
      imageUrl: [this.selectProduct.imageUrl, Validators.required],
      price: [this.selectProduct.price, Validators.required],
      category: [this.selectProduct.category, Validators.required]
    });


  }
  
  changeConfirm() {
    this.isConfirm = !this.isConfirm;

    
    if (this.isConfirm) {
      this.form.controls['title'].disable();
      this.form.controls['imageUrl'].disable();
      this.form.controls['price'].disable();
      this.form.controls['category'].disable();
    }
      
    else {
      this.form.controls['title'].enable();
      this.form.controls['imageUrl'].enable();
      this.form.controls['price'].enable();
      this.form.controls['category'].enable(); 
    }
    }

  updateProduct() {
    this.productService.editProduct(this.form.value);
    this.router.navigate(['/admin']);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
  }
}
