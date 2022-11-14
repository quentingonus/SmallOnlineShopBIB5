import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontEnd';
  constructor(private cartService: CartService) { }
  async ngOnInit() {
    await this.cartService.postGetCart()
  }
}
