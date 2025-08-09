import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from '@services/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Smart Home');
  private authService = inject(Auth);

  ngOnInit() {
    const token = localStorage.getItem('smart_home_access_token');
    if (token) {
      this.authService.loadUserData(token).subscribe({
        next: () => {
          console.log('Login performed via LocalStorage');
          this.authService.router.navigate(['/dashboard/overview']);
        },
      });
    }
  }
}
