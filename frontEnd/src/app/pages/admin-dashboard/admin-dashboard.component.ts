import { AuthService } from 'src/app/services/auth.service';
import { Product } from './../../services/cart.service';
import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PipeTransform,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, pipe, startWith } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';

export type SortColumn = keyof Product | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})

export class AdminDashboardComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  products!: Product[];
  category!: any;
  filteredProducts!: Product[];
  pageName = 'products'

  page = 1;
  pageSize = 4;
  collectionSize: any;
  searchQuery = "";
  users!: any;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private postService: PostService,
    public util: UtilsService,
    private authService: AuthService
  ) { }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (!this.filteredProducts) {
      if (direction === '' || column === '') {
        this.products = this.products;
      } else {
        this.products = [...this.products].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    } else {
      if (direction === '' || column === '') {
        this.filteredProducts = this.filteredProducts;
      } else {
        this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }
  }

  filter(query: any) {
    try {
      return this.products.filter((product: any) => {
        let price = product.price;
        return (
          product.title
            .toLowerCase()
            .includes(query.trim().toLowerCase())
          || this.util
            .searchCategory(product.category, this.category)
            .toLowerCase()
            .includes(query.trim().toLowerCase())
          || String(price)
            .includes(query.trim().toLowerCase())
        );
      })
    } catch (error) {
      return []
    }
  }

  editProduct(product: any) {
    this.productService.selectProduct = product;
    this.router.navigate(['/admin/edit-product']);
  }

  async deleteProduct(product: any, button: any) {
    button.classList.add('loading');
    await this.postService.deleteProduct(product);
    this.products.splice(this.products.indexOf(product), 1);
  }

  sliceIntoChunks(arr: any, chunkSize: any) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  filteredProduct() {
    let query = this.searchQuery ? this.searchQuery : ""
    let tmpProduct = this.filter(query)
    if (tmpProduct && tmpProduct.length) {
      let filtered = this.sliceIntoChunks(tmpProduct, this.pageSize)
      filtered = filtered[this.page - 1]
      return filtered
    } else {
      return []
    }

  }

  getUserId(userIndex: any) {
    return this.users[userIndex]._id;
  }

  async deleteUser(user: any, button:any ) {
    button.classList.add('loading');

    let userIndex = this.users.indexOf(user);
    let userId = this.getUserId(userIndex);
    console.log('User ID: ', userId);

    await this.authService.deleteUser(userId);
    this.users.splice(userIndex, 1);
  }

  isProduct(): boolean {
    if (this.pageName == 'products') return true;
    return false;
  }

  async ngOnInit() {
    this.products = await this.cartService.getShop();
    this.products = this.products.map((product, i) => ({ index: i + 1, ...product }));
    this.pageSize = this.products.length

    this.category = await this.postService.getCategory();
    this.category = this.category.data;

    this.users = await this.authService.getUsers();
    this.users = this.users.data.map((item: any, index: any) => { item.index = index + 1; return item; });
    console.log('Users', this.users)

  }
}