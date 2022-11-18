import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent implements OnInit {
  promotion = [
    {
      name: 'စူပါ ကြက်ဥကြော်',
      amount: '50',
      imageUrl: 'https://i.insider.com/618437dc326b26001834dd99?width=700',
      code: 'Pe5YfAydrh',
      position: 'left',
    },
    {
      name: 'ရုပ်ပြ စာအုပ်',
      amount: '20',
      imageUrl:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3BlbiUyMGJvb2t8ZW58MHx8MHx8&w=1000&q=80',
      code: '368Tzx6Jjr',
      position: 'right',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
