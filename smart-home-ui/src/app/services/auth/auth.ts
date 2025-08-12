import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '@models/auth.model';
import { TokenStorage } from '@services/token-storage';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  tokenStorage = inject(TokenStorage);
  http: HttpClient = inject(HttpClient);
  router = inject(Router);
  baseApiUrl = 'http://localhost:3004/api/';
  userData?: AuthResponse;
  private userSubject = new BehaviorSubject<AuthResponse | undefined>(
    undefined,
  );
  user$ = this.userSubject.asObservable();

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
  }

  loadUserData(token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<AuthResponse>(`${this.baseApiUrl}user/profile`, { headers })
      .pipe(tap((response) => this.userSubject.next(response)));
  }

  getUserData() {
    return this.userData;
  }
}
