import { Product } from './../../services/cart.service';
import { Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, Directive, EventEmitter, Input, OnInit, Output, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, pipe, startWith } from 'rxjs';

export type SortColumn = keyof Product | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

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
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  products: Product[];
  filteredProducts!: Product[];
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
    this.filteredProducts = (query.trim()) ? 
      this.products.filter(product => {
        let price = product.price;
        return (
          product.title.toLowerCase().includes(query.trim().toLowerCase()) ||
          product.category.toLowerCase().includes(query.trim().toLowerCase()) ||
          String(price).includes(query)
        )
      }) :
      this.products
  }

  ngOnInit(): void {
  }

}

