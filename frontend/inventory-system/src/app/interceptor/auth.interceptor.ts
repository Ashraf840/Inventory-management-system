import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environments';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const access_token = getAccessToken();
  const router = inject(Router);

  if (access_token) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`,
      }
    });
    return next(newReq).pipe(
      catchError(error => {
        console.log("error", error);
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401 || error.status === 403) {
            localStorage.removeItem(environment.JWT_TOKEN);
            router.navigate(['auth/login']);
          }
        }
        return throwError(error)
      })
    );
  }
  
  return next(req);
};

function getAccessToken(): string | null {
  let jwt = localStorage.getItem('JWT_TOKEN');
  let get_access_token = jwt && JSON.parse(jwt)?.access_token;
  return get_access_token;
}
