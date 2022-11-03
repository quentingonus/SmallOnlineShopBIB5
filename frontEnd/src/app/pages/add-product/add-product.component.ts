import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form;
  id: any;
  category: any;
  isConfirm: boolean = false;

  constructor(private productService: ProductsService, private fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.category = this.productService.category;
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

  confirm() {
    this.productService.addProduct(this.form.value);
    this.router.navigate(['/admin']);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
  }

}
