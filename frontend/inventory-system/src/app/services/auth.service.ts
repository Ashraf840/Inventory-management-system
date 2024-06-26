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

  isLoggedIn(): boolean {
    // console.log("JWT-TOKEN (isLoggedIn):", localStorage.getItem(environment.JWT_TOKEN));
    
    return !!localStorage.getItem(environment.JWT_TOKEN);
  }

  obtainAccessToken(refresh_token: string): Observable<any> {
    console.log("refresh_token - obtainAccessToken():", refresh_token);
    return this.http.post<any>(this.url + 'user/refresh-token', {refresh_token: refresh_token});
  }

  logout(): void {
    localStorage.removeItem(environment.JWT_TOKEN);
  }
}
