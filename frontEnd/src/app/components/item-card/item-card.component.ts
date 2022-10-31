import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() cardItem!: any;

  @Output() addToCartFunc = new EventEmitter<string>();

  addToCart(item: any) {
    this.addToCartFunc.emit(item)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
