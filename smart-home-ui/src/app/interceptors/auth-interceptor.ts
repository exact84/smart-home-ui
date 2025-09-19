import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { TokenStorage } from '@services/token-storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorage);
  const router = inject(Router);
  const token = tokenStorage.getToken();

  if (!req.url.startsWith('http') && !req.url.startsWith('/api')) {
    req = req.clone({
      url: `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`,
    });
  }

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        tokenStorage.removeToken();
        router.navigate(['/login']);
        return EMPTY;
      }
      return throwError(() => error);
    }),
  );
};
