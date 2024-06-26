import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenData } from '../interface/auth/token-data';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, filter, finalize, retry, switchMap, take, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  let tokenData: TokenData = {};

  let isRefreshing = false;

  let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  if (authService.isLoggedIn()) {
    const { access_token, refresh_token } = getJwtToken();
    
    if (access_token && refresh_token) {
      let bearerTokenReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return next(bearerTokenReq).pipe(
        catchError((err): Observable<any> => {
          console.log("Acceess token error!");
          
          // return throwError(() => err)
          return handleTokenError(req, isRefreshing, refreshTokenSubject, authService, refresh_token, router, next);
        })
      );
    }
  }
  
  return next(req);
};

function handleTokenError(
  req: HttpRequest<any>, 
  isRefreshing: boolean,
  refreshTokenSubject: BehaviorSubject<any>,
  authService: AuthService,
  refresh_token: string,
  router: Router,
  next: HttpHandlerFn
) {
  if (!isRefreshing) {
    debugger
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.obtainAccessToken(refresh_token).pipe(
      switchMap((aToken): any => {
        debugger
        if (aToken) {
          refreshTokenSubject.next(aToken);
          return next(req.clone({ setHeaders: { Authorization: `Bearer ${aToken}` } }));
        }
        else {
          autoLogut(authService, router);
        }
      }),
      catchError((err) => {
        autoLogut(authService, router);
        return throwError(() => err)
      }),
      finalize(() => isRefreshing = false)
    )
  } else {
    debugger
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
      })
    );
  }
}

function getJwtToken(): TokenData {
  const jwt = localStorage.getItem(environment.JWT_TOKEN);
  const parsed_jwt = jwt && JSON.parse(jwt);
  console.log("parsed_jwt:", parsed_jwt);
  return parsed_jwt;
}

function accessToken_isValid(atoken: string): boolean {
  const token = jwtDecode(atoken);
  console.log("access token:", token);
  let token_exp = token?.exp;
  // console.log("Date now:", Date.now()/1000);
  console.log("Access token expired:", token_exp && Date.now()/1000 > token_exp)
  if (token_exp && (Date.now()/1000 > token_exp)) return false;
  return true;
}

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
