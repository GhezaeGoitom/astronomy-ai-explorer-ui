import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user/user';
import { ActivatedRoute } from '@angular/router';
import { AppRole, UserRole } from '../../../auth/models/user.model';


@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly editing = signal(false);
  private userId: number | null = null;

  readonly loading = signal(false);
  readonly error = signal('');

  readonly roles = signal<AppRole[]>([]);
 readonly selectedRoles = signal<number[]>([]);


  ngOnInit(): void {

    this.loadRoles();

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.editing.set(true);
    this.userId = Number(id);
    this.loadUser(this.userId);
  }

  if (this.editing()) {
  this.form.controls.password.clearValidators();
  this.form.controls.password.updateValueAndValidity();
}
}

  readonly form = this.fb.nonNullable.group({
    username: ['', [
      Validators.required,
      Validators.maxLength(50)
    ]],

    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)
    ]],

    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255)
    ]],

    enabled: [true]
  });



  // submiting the form
 submit(): void {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading.set(true);
  this.error.set('');

  if (this.editing() && this.userId !== null) {

  const { username, email, enabled } =
    this.form.getRawValue();

  this.userService.updateUser(
    this.userId,
    {
      username,
      email,
      enabled
    }
  ).subscribe({

    next: () => {

      this.userService.updateRoles(
        this.userId!,
        this.selectedRoles()
      ).subscribe({

        next: () => {
          this.router.navigate(['/admin/users']);
        },

        error: error => {
          console.error('Failed to update roles:', error);

          this.error.set(
            error.error?.message ?? 'Failed to update roles.'
          );

          this.loading.set(false);
        }

      });

    },

    error: error => {
      console.error('Failed to update user:', error);

      this.error.set(
        error.error?.message ?? 'Failed to update user.'
      );

      this.loading.set(false);
    }

  });

  return;
}

  this.userService.createUser(
    this.form.getRawValue()
  ).subscribe({

    next: () => {
      this.router.navigate(['/admin/users']);
    },

    error: error => {
      console.error('Failed to create user:', error);

      this.error.set(
        error.error?.message ?? 'Failed to create user.'
      );

      this.loading.set(false);
    }
  });
}
  cancel(): void {
    this.router.navigate(['/admin/users']);
  }

  private loadUser(id: number): void {

  this.loading.set(true);

  this.userService.getUser(id).subscribe({

    next: user => {

  this.form.patchValue({
    username: user.username,
    email: user.email,
    enabled: user.enabled
  });

this.selectedRoles.set(
  this.roles()
    .filter(role => user.roles.includes(role.name))
    .map(role => role.id)
);

  this.loading.set(false);
},

    error: error => {

      console.error('Failed to load user:', error);

      this.error.set(
        error.error?.message ?? 'Failed to load user.'
      );

      this.loading.set(false);
    }
  });
}

toggleRole(roleId: number): void {
  this.selectedRoles.update(current => {
    if (current.includes(roleId)) {
      return current.filter(id => id !== roleId);
    }

    return [...current, roleId];
  });
}

private loadRoles(): void {
  this.userService.getRoles().subscribe({
    next: roles => {
      this.roles.set(roles);
    },
    error: error => {
      console.error('Failed to load roles:', error);
    }
  });
}
}