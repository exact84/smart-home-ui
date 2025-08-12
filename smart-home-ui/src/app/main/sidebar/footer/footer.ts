import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthResponse } from '@models/auth.model';
import { Auth } from '@services/auth/auth';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  authService = inject(Auth);
  user: AuthResponse | undefined;
  onLogout() {
    this.authService.logout();
  }
}
