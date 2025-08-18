import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '@services/auth/auth';
import { TokenStorage } from '@services/token-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  tokenStorage = inject(TokenStorage);
  protected readonly title = signal('Smart Home');
  private authService = inject(Auth);
  private router = inject(Router);

  ngOnInit() {
    const token = this.tokenStorage.getToken();
    if (token) {
      this.authService.loadUserData(token).subscribe({
        next: () => {
          console.log('Login performed via LocalStorage');
          this.router.routerState.root.firstChild?.paramMap.subscribe(() => {
            if (!this.router.url.includes('/dashboard/'))
              this.authService.router.navigate(['/dashboard']);
          });
        },
      });
    }
  }
}
