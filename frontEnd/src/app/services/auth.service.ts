import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError, lastValueFrom, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected authUserSubject = new Subject<any>();
  authUser$: Observable<any> = this.authUserSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

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
    let formData = new FormData()
    formData.append("email", payload.mail)
    formData.append("password", payload.password)
    return lastValueFrom(this.http.post(`${environment.apiUrl}/auth/login`, formData))
  }

  public signUp(payload: any) {
    let formData = new FormData()
    formData.append("name", payload.name)
    formData.append("email", payload.email)
    formData.append("password", payload.password)
    formData.append("profileImage", "https://st3.depositphotos.com/15437752/19006/i/600/depositphotos_190061104-stock-photo-silhouette-male-gradient-background-white.jpg")
    formData.append("address", "")
    formData.append("phone", "")
    formData.append("dob", "")
    return lastValueFrom(this.http.post(`${environment.apiUrl}/auth/signup`, formData))
  }


  public reset(payload: any): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/forgot-password`, payload))
  }

  public resetPasswordUpdate(id: string, token: string, payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/password-reset-update/${id}/${token}`, payload))
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('TOKEN');
    return !this.jwtHelper.isTokenExpired((token as any));
  }

  public isAdmin() {
    console.log(`${localStorage.getItem('ROLE')} - ADMIN`)
    return localStorage.getItem('ROLE') == "ADMIN";
  }

}

