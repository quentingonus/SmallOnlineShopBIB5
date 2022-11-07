import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  modifyCategory(shopItem: any) {
    let newArr: any = {};
    shopItem.map((item: any) => {
      newArr[item.category] = item.category in newArr ? newArr[item.category] : []
      newArr[item.category].push(item)
    })
    return newArr
  }

  getKeyArr(obj: any) {
    try {
      return Object.keys(obj)
    } catch (e) {
      return []
    }
  }

  isLoading(button: any) {
    return button.classList.contains('loading')
  }
}
