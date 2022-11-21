import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Everything Shop';
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private route: Router
  ) { }
  async ngOnInit() {
    if (localStorage.hasOwnProperty('USER')) {
      if (!this.authService.isAuthenticated()) {
        this.route.navigate(['/logout']);
      }
      await this.cartService.postGetCart();
    }
  }
}
