import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  shopItems!: any;
  categories!: any;

  constructor(
    private cart: CartService,
    private postService: PostService,
    public util: UtilsService
  ) { }

  async ngOnInit() {
    let shopItem = await this.cart.getShop();
    this.categories = await this.postService.getCategory();
    shopItem.map((item: any) => {
      item.category = this.util.searchCategory(item.category, this.categories.data)
      return item
    })
    this.shopItems = this.util.modifyCategory(shopItem);
  }

}
