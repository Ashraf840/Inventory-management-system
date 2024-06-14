import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../interface/auth/login-data';
import { Observable, tap } from 'rxjs';
import { TokenData } from '../interface/auth/token-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl;

  http = inject(HttpClient);
  
  constructor() { }

  login(loginData: LoginData): Observable<any> {
    return this.http.post<LoginData>(this.url + 'user/login', loginData).pipe(
      tap((token: any) => {
        this.storeJwt(token);
      })
    );
  }
  
  storeJwt(token: TokenData): void {
    localStorage.setItem(environment.JWT_TOKEN, JSON.stringify(token));
  }

  isLoggedIn() {
    return !!localStorage.getItem(environment.JWT_TOKEN);
  }
}
