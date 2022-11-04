import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
    this.getProducts()
  }

  getProducts(): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/product`))
  }
}
