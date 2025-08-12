import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '@models/auth.model';
import { TokenStorage } from '@services/token-storage';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  tokenStorage = inject(TokenStorage);
  http: HttpClient = inject(HttpClient);
  router = inject(Router);
  baseApiUrl = 'http://localhost:3004/api/';
  userSubject = signal<AuthResponse | undefined>(undefined);
  isAuthenticated = computed(() => this.userSubject() !== undefined);

  login(payload: { username: string; password: string }) {
    const body = new HttpParams()
      .set('userName', payload.username)
      .set('password', payload.password);
    return this.http
      .post<{ token: string }>(`${this.baseApiUrl}user/login`, body)
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
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<AuthResponse>(`${this.baseApiUrl}user/profile`, { headers })
      .pipe(tap((response) => this.userSubject.set(response)));
  }
}
