import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '@models/auth.model';
import { TokenStorage } from '@services/token-storage';
import { BASE_API_URL } from 'app/constants/base-url';
import { catchError, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  tokenStorage = inject(TokenStorage);
  http: HttpClient = inject(HttpClient);
  router = inject(Router);
  userSubject = signal<AuthResponse | undefined>(undefined);
  readonly isAuthenticated = computed(
    () => !!this.tokenStorage.getToken() && !!this.userSubject(),
  );

  private loading = false;

  login(payload: { username: string; password: string }) {
    const body = new HttpParams()
      .set('userName', payload.username)
      .set('password', payload.password);
    return this.http
      .post<{ token: string }>(`${BASE_API_URL}user/login`, body)
      .pipe(
        tap((res) => this.tokenStorage.saveToken(res.token)),
        switchMap((res) => this.loadUserData(res.token)),
      );
  }

  logout() {
    this.tokenStorage.removeToken();
    this.router.navigate(['/login']);
    this.userSubject.set(undefined);
  }

  loadUserData(token: string) {
    if (this.userSubject() || this.loading) {
      return of(this.userSubject());
    }

    this.loading = true;
    const headers = { Authorization: `Bearer ${token}` };

    return this.http
      .get<AuthResponse>(`${BASE_API_URL}user/profile`, { headers })
      .pipe(
        tap((res) => this.userSubject.set(res)),
        catchError(() => {
          return of(undefined);
        }),
        tap(() => (this.loading = false)),
      );
  }
}
