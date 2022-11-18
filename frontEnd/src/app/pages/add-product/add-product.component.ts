import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  form;
  id: any;
  category: any;
  isConfirm: boolean = false;
  uploadFile!: any;
  uploadFilePreview!: any;
  addNewCategory: boolean = false;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    public util: UtilsService
  ) {
    this.form = fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      detail: ['', Validators.required],
    });
  }

  changeConfirm() {
    this.isConfirm = !this.isConfirm;

    if (this.isConfirm) {
      this.form.controls['title'].disable();
      this.form.controls['imageUrl'].disable();
      this.form.controls['price'].disable();
      this.form.controls['category'].disable();
      this.form.controls['detail'].disable();
    } else {
      this.form.controls['title'].enable();
      this.form.controls['imageUrl'].enable();
      this.form.controls['price'].enable();
      this.form.controls['category'].enable();
      this.form.controls['detail'].enable();
    }
  }

  async confirm(button: any) {
    button.classList.add('loading');
    let tmpForm = { ...this.form.value };
    tmpForm.imageUrl = this.uploadFile;
    if (this.addNewCategory) {
      let res = await this.postService.createCategory(
        tmpForm.category,
        tmpForm.imageUrl
      );
      tmpForm.category = (res as any).data._id;
    }
    let res = await this.postService.createProducts(tmpForm);
    console.log(res);
    this.router.navigate(['/admin']);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  changeFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.uploadFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.uploadFilePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  watchCategory(event: any) {
    if (event.target.value == 'add-new-category') {
      this.addNewCategory = true;
      this.form.get('category')?.setValue('');
    }
  }

  async ngOnInit() {
    this.category = await this.postService.getCategory();
    this.category = this.category.data;
  }
}
