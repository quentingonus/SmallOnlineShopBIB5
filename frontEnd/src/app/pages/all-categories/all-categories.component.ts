import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  shopItems = [
    {
      name: "iPhone 14 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1499,
      img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-spaceblack_AV1?wid=5120&hei=2880&fmt=jpeg&qlt=90&.v=1662060528154"
    },
    {
      name: "iPhone 13 Pro Max",
      about: "iPhone is a device powered by iOS produced by Apple.",
      price: 1099,
      img: "https://i.expansys.net/i/b/b361875-5.jpg"
    }
  ]

  constructor() { }

  addToCart(item: any) {
    console.log("Item Add to Cart: ", item)
  }

  ngOnInit(): void {
  }

}
