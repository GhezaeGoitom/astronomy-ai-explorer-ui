import {
  Component,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../../core/auth/auth';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';

  readonly loading = signal(false);
  readonly error = signal('');

  login(): void {

    if (!this.username || !this.password) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({

      next: () => {
        this.router.navigate(['/dashboard']);
      },

      error: error => {

        console.error('Login failed:', error);

        this.error.set(
          error.error?.message ?? 'Invalid username or password.'
        );

        this.loading.set(false);
      }

    });
  }
}