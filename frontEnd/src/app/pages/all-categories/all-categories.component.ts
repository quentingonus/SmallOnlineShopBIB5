import { ActivatedRoute, Router } from '@angular/router';
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
  params!: any
  searchText: any

  constructor(
    private cart: CartService,
    private postService: PostService,
    public util: UtilsService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  textType(elem: any) {
    clearTimeout(elem.delay);
    elem.delay = setTimeout(
      function () {
        elem.dispatchEvent(new Event('search'));
      }.bind(elem),
      800
    );
  }

  async findProduct() {
    if (this.searchText.trim().length > 0) {
      this.postService
        .postSearchService(this.searchText)
        .then((res: any) => {
          this.filterProducts = res.data.map((item: any) => {
            item = this.cart.modifyItem(item);
            item.category = this.util.searchCategory(
              item.category,
              this.categories.data
            );
            return item;
          });
        })
        .catch((e: any) => {
          this.filterProducts = null;
        });
    }
    if (this.searchText.trim().length == 0) {
      this.filterProducts = null;
    }
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.params = params;
    });
    if ('q' in this.params) {
      this.searchText = this.params.q;
      setTimeout(() => { this.findProduct() }, 1300)
    }
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
