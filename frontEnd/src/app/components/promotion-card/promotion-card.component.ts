import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss']
})
export class PromotionCardComponent implements OnInit {

  @Input() promo: any;
  backgroundStyle: any;

  constructor() { }

  ngOnInit(): void {
  }

}
