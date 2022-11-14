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
  ) { }

  onFocus() {
    this.router.navigate(['/search']);
  }

  async findProduct(query: any) {
    if (query.value.trim().length > 0) {
      let filter: any = await this.postService.postSearchService(query.value)
      this.filterProducts = filter.data.map((item: any) => {
        item = this.cart.modifyItem(item)
        item.category = this.util.searchCategory(item.category, this.categories.data)
        return item
      })
    }
    if (query.value.trim().length == 0) {
      this.filterProducts = null;
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
