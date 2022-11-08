import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError, lastValueFrom, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected authUserSubject = new Subject<any>();
  authUser$: Observable<any> = this.authUserSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }
  
  async isLoggedIn() {
    if (localStorage.getItem('userLoginData')) {
      await this.authUserSubject.next(localStorage.getItem('userLoginData'));
    } else {
      await this.authUserSubject.next(null);
    }
  }

  //login(uname : string, pword : string) {
  //  if ( uname === 'Admin' && pword === 'admin123') {
  //    return 200;
  //  } else {
  //    return 403;
  //  }
  //}
  public login(payload: any) {
     return lastValueFrom(this.http.post(`${environment.apiUrl}/login`,payload))
   }
  

  public reset(payload: any) : Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/forgot-password`, payload))
  }

  public resetPasswordUpdate(id: string, token: string, payload: any) : Promise <any>{
    return lastValueFrom(this.http.post(`${environment.apiUrl}/password-reset-update/${id}/${token}`,payload))
  }
  
}
  
