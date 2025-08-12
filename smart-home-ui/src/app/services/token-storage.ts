import { Injectable } from '@angular/core';
import { TOKEN_NAME } from 'app/constants/token-name';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  saveToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
    console.log('Token received:', token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }
}
