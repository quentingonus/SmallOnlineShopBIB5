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
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PostService } from 'src/app/services/post.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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
  pageName = 'products';

  page = 1;
  pageSize = 4;
  collectionSize: any;
  searchQuery = '';
  users!: any;
  customChartData!: any;
  deleteUserName = ""


  constructor(
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private postService: PostService,
    public util: UtilsService,
    private authService: AuthService,
    private modalService: NgbModal
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
          product.title.toLowerCase().includes(query.trim().toLowerCase()) ||
          this.util
            .searchCategory(product.category, this.category)
            .toLowerCase()
            .includes(query.trim().toLowerCase()) ||
          String(price).includes(query.trim().toLowerCase())
        );
      });
    } catch (error) {
      return [];
    }
  }

  editProduct(product: any) {
    this.productService.selectProduct = product;
    this.router.navigate(['/admin/edit-product']);
  }

  deleteProduct(product: any, button: any) {
    button.classList.add('loading');
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete " + product.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm.',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.postService
          .deleteProduct(product)
          .then((res: any) => {
            Swal.fire('Delete Success!', 'Product ' + product.title + ' is deleted.', 'success')
              .then(res => {
                this.products.splice(this.products.indexOf(product), 1);
                button.classList.remove('loading');
              })
          })
          .catch((err: any) => {
            Swal.fire('An Error Occurs!', err.error, 'error');
            button.classList.remove('loading');
          });
      }
    });
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
    let query = this.searchQuery ? this.searchQuery : '';
    let tmpProduct = this.filter(query);
    if (tmpProduct && tmpProduct.length) {
      let filtered = this.sliceIntoChunks(tmpProduct, this.pageSize);
      filtered = filtered[this.page - 1];
      return filtered;
    } else {
      return [];
    }
  }

  getUserId(userIndex: any) {
    return this.users[userIndex]._id;
  }

  deleteConfirm(user: any, button: any, content: any) {
    button.classList.add('loading');
    this.deleteUserName = user.name
    this.modalService.open(content).result.then(
      (result) => {
        this.continueDelete(user, button)
      },
      (reason) => {
        button.classList.remove('loading');
      },
    )
  }

  continueDelete(user: any, button: any) {
    let userIndex = this.users.indexOf(user);
    let userId = this.getUserId(userIndex);
    this.authService
      .deleteUser(userId)
      .then((res: any) => {
        if (res.success) {
          this.users.splice(userIndex, 1);
          button.classList.remove('loading');
        } else {
          alert('An Error Occurs');
        }
      })
      .catch((err: any) => {
        console.log(err);
        alert(err.error);
        button.classList.remove('loading');
      });
  }

  isProduct(): boolean {
    if (this.pageName == 'products') return true;
    return false;
  }

  isCurrentUser(user: any) {
    let currentUser = JSON.parse(localStorage.getItem("USER") || "{}")
    if (currentUser) {
      if (currentUser._id == user._id) {
        return true
      }
    }
    return false
  }

  promoteUser(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will promote " + user.name + " to ADMIN privileges.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm.',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.authService.postUpdateUserType({
          _id: user._id,
          type: "Admin"
        })
          .then((res: any) => {
            this.users[user.index - 1].type = "Admin"
            Swal.fire('Promoted!', 'User ' + user.name + ' is now an ADMIN.', 'success');
          })
          .catch((err: any) => {
            Swal.fire('An Error Occurs!', err.error, 'error');
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'User ' + user.name + ' is still NORMAL USER.', 'success');
      }
    });
  }

  demoteAdmin(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will demote " + user.name + " to NORMAL USER.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm.',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.authService.postUpdateUserType({
          _id: user._id,
          type: "Admin"
        })
          .then((res: any) => {
            this.users[user.index - 1].type = "User"
            Swal.fire('Demoted!', 'User ' + user.name + ' is now NORMAL USER.', 'success');
          })
          .catch((err: any) => {
            Swal.fire('An Error Occurs!', err.error, 'error');
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'User ' + user.name + ' is still ADMIN.', 'success');
      }
    });
  }

  async ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("USER") || "{}")
    if (!currentUser || currentUser.type != "Admin") {
      this.router.navigate(['/home'])
    }
    this.products = await this.cartService.getShop();
    this.products = this.products.map((product, i) => ({
      index: i + 1,
      ...product,
    }));
    this.pageSize = this.products.length;

    this.category = await this.postService.getCategory();
    this.category = this.category.data;

    this.users = await this.authService.getUsers();
    this.users = this.users.data.map((item: any, index: any) => {
      item.index = index + 1;
      return item;
    });

    let tmpChart = await this.postService.getChart()
    let chartLabels: any = ["Products"];
    let chartData: any = [];
    //console.log(tmpChart.data)
    tmpChart.data.forEach((item: any) => {
      chartData.push({
        data: [item[1]],
        label: item[2]
      })
    })
    this.customChartData = {
      labels: chartLabels,
      datasets: [...chartData]
    };
  }
}
