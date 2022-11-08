import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //order: any = {
  //  customer: [],
  //  orderProduct: []
  //};

  order: any[] = [];
  viewOrder: any;
  
  constructor() {}
}
