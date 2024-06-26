import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../environments/environments';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenData } from '../interface/auth/token-data';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt_token = getJwtToken();
  let access_token = jwt_token && JSON.parse(jwt_token)?.access_token;
  let refresh_token = jwt_token && JSON.parse(jwt_token)?.refresh_token;
  let tokenData: TokenData = {};

  
  const router = inject(Router);
  const authService = inject(AuthService);

  if (access_token) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`,
      }
    });
    return next(newReq).pipe(
      catchError(error => {
        console.log("error", error);
        // if(error instanceof HttpErrorResponse && error.status === 401 || error.status === 403) {

            // Send the exisiting refresh token to the refresh-token endpoint (Try; If recieves a 401 or 403 error, then remove the JWT_TOKEN & redirect to login page)
            if (refresh_token) {

              debugger;
              return authService.obtainAccessToken(refresh_token).pipe(
                switchMap((data: any) => {
                  if (data?.access_token) {
                    console.log("auth-interceptor (data):", data);
                    tokenData.access_token = data.access_token;
                    tokenData.refresh_token = refresh_token;
                    console.log("tokendata:", tokenData);
  
                    debugger;
                    authService.storeJwt(tokenData);
  
                    const retryReq = req.clone({
                      setHeaders: {
                        Authorization: `Bearer ${tokenData.access_token}`,
                      }
                    });
  
                    // Return the retried request
                    return next(retryReq);
                  } else {
                    // Handle the case where no access token is received
                    localStorage.removeItem(environment.JWT_TOKEN);
                    router.navigate(['auth/login']);
                    return throwError(() => new Error('Unable to refresh access token'));
                  }
                }),
                catchError((refreshError) => {
                  localStorage.removeItem(environment.JWT_TOKEN);
                  router.navigate(['auth/login']);
                  return throwError(refreshError);
                })
              );
            } else {
              localStorage.removeItem(environment.JWT_TOKEN);
              router.navigate(['auth/login']);
            }
        // }
        return throwError(error)
      })
    );
  }
  
  return next(req);
};

function getJwtToken(): string | null {
  let jwt = localStorage.getItem('JWT_TOKEN');
  return jwt;
}
