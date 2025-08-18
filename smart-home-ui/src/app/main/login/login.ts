import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from 'app/services/auth/auth';

type LoginFormData = {
  username: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(Auth);
  loginError = undefined;

  form = new FormGroup<LoginFormData>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    const loginData = this.form.getRawValue();
    this.authService.login(loginData).subscribe({
      next: () => {
        this.authService.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loginError = error.status;
      },
    });
  }
}
