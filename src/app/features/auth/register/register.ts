import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../../core/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal('');
  readonly success = signal('');

  readonly form = this.fb.nonNullable.group({

    username: [
      '',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]
    ],

    confirmPassword: [
      '',
      [
        Validators.required
      ]
    ]

  });


  submit(): void {

    this.error.set('');
    this.success.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {
      username,
      email,
      password,
      confirmPassword
    } = this.form.getRawValue();


    if (password !== confirmPassword) {

      this.error.set(
        'Passwords do not match.'
      );

      return;
    }


    this.loading.set(true);


    this.authService.register({

      username,
      email,
      password,

      // New public accounts are enabled immediately.
      enabled: true

    }).subscribe({

      next: () => {

        this.loading.set(false);

        this.success.set(
          'Account created successfully. Redirecting to login...'
        );

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);

      },

      error: error => {

        console.error(
          'Failed to create account:',
          error
        );

        this.error.set(
          error.error?.message ??
          'Unable to create your account. Please try again.'
        );

        this.loading.set(false);
      }

    });
  }
}