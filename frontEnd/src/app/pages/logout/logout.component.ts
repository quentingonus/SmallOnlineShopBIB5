import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private cartService: CartService) {}

  async ngOnInit() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('ROLE');
    await this.cartService.postDeleteCart();
    this.router.navigate(['login']);
  }
}
