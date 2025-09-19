import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@services/auth';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);
  const token = authService.tokenStorage.getToken();

  if (!token) return router.parseUrl('/login');

  if (authService.userSubject()) return true;

  return authService.loadUserData(token).pipe(
    map((res) => {
      return res ? true : router.parseUrl('/login');
    }),
    catchError(() => {
      return of(router.parseUrl('/login'));
    }),
  );
};
