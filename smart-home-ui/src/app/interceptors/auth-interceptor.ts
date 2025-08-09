import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('smart_home_access_token');

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
        localStorage.removeItem('smart_home_access_token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
