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

  searchCategory(id: any, list: any) {
    if (!list) {
      return ""
    }
    for (let i of list) {
      if (i._id == id) {
        return i.name
      }
    }
    return ""
  }

  getRandomFromArray(array: any, amount: any) {
    if (amount > array.length) {
      return array
    }
    let rndArr = []
    for (let i = 0; i < amount; i++) {
      let rndItem = array[Math.floor(Math.random() * array.length)];
      let rndItemIndex = array.indexOf(rndItem)
      array.splice(rndItemIndex, 1)
      rndArr.push(rndItem)
    }
    return rndArr;
  }

  isLoading(button: any) {
    return button.classList.contains('loading')
  }
}
