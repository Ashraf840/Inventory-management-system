import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../environments/environments';
import { TokenData } from '../interface/auth/token-data';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  let refreshTokenIsInvalid = false;

  let tokenData: TokenData = {};

  // if (authService.isLoggedIn() && !refreshTokenIsInvalid) {
  if (authService.isLoggedIn()) {
    const jwt = localStorage.getItem(environment.JWT_TOKEN);
    const access_token = jwt && JSON.parse(jwt)?.access_token;
    const refresh_token = jwt && JSON.parse(jwt)?.refresh_token;

    if (refresh_token && refreshToken_isValid(refresh_token)) {
      const bearerReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return next(bearerReq).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log("error:", error);
          console.log("refresh token:", refresh_token);
          // refreshTokenIsInvalid = true;
  
          // if ((error.status === 401 || error.status === 403) && !refreshTokenIsInvalid) {
          if (error.status === 401 || error.status === 403) {
            // refreshTokenIsInvalid = true;
            // console.log("Try to obtain new access token from hitting the refresh token API!");
            return authService.obtainAccessToken(refresh_token).pipe(
              switchMap((data: any) => {
                console.log("New access token:", data);
  
                tokenData.access_token = data.access_token;
                tokenData.refresh_token = refresh_token;
  
                authService.storeJwt(tokenData);
                
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${data.access_token}`
                  }
                });
  
                // refreshTokenIsInvalid = false;
  
                return next(retryReq);
              }),
              // // catchError((error: HttpErrorResponse) => throwError(() => new Error('Refresh token invalid or expired! Login Again!')))
              // catchError((error: HttpErrorResponse) => {
              //   console.log("New access token obtain failed!");
              //   localStorage.removeItem(environment.JWT_TOKEN);
              //   setTimeout(() => {
              //     router.navigate(['auth/login']);
              //   }, 0);
              //   return throwError(() => new Error('Refresh token invalid or expired! Login Again!'))
              // })
            );
          }
          // refreshTokenIsInvalid = false;
          return throwError(() => error);
        })
      );
    } else {
      autoLogut(authService, router);
    }

    
  } 
  // else {
  //   localStorage.removeItem(environment.JWT_TOKEN);
  //   setTimeout(() => {
  //     router.navigate(['auth/login']);
  //   }, 0);
  // }
  
  return next(req);
};


function refreshToken_isValid(rtoken: string): boolean {
  const token = jwtDecode(rtoken);
  console.log("refresh token:", token);
  let token_exp = token?.exp;
  console.log("Refresh token expired:", token_exp && Date.now()/1000 > token_exp)
  if (token_exp && (Date.now()/1000 > token_exp)) return false;
  return true;
}

function autoLogut(authService: AuthService, router: Router): void {
  authService.logout();
  setTimeout(() => {
    router.navigate(['auth/login']);
  }, 0);
}


// function loginPageNavigate(): HttpErrorResponse {
//   const router = inject(Router);
//   localStorage.removeItem(environment.JWT_TOKEN);
//   setTimeout(() => {
//     router.navigate(['auth/login']);
//   }, 0);
//   throw new Error('Refresh token is not found!');
// }

