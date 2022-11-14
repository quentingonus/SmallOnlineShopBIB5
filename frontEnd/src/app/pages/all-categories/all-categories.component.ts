import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
})
export class AllCategoriesComponent implements OnInit {
  shopItems!: any;
  categories!: any;
  filterProducts!: any;

  constructor(
    private cart: CartService,
    private postService: PostService,
    public util: UtilsService,
    public router: Router
  ) {}

  onFocus() {
    this.router.navigate(['/search']);
  }

  async findProduct(query: any) {
    console.log(query.value);

    if (query.value.trim().length > 0) {
      let products = await this.cart.getShop();
      console.log('Products', products);

      this.filterProducts = products.filter((product: any) => {
        return product.title
          .toLowerCase()
          .includes(query.value.trim().toLowerCase());
      });

      console.log('FilteredProducts :', this.filterProducts);
    }
    if (query.value.trim().lenght <= 0) {
      this.filterProducts = [];
    }
  }

  async ngOnInit() {
    let shopItem = await this.cart.getShop();
    this.categories = await this.postService.getCategory();
    shopItem.map((item: any) => {
      item.category = this.util.searchCategory(
        item.category,
        this.categories.data
      );
      return item;
    });
    this.shopItems = this.util.modifyCategory(this.util.shuffleArray(shopItem));
  }
}
