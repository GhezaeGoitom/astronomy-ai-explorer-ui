import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user/user';
import { AppUser } from '../../../auth/models/user.model';


@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  private readonly userService = inject(UserService);

  readonly users = signal<AppUser[]>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);

    this.userService.getUsers().subscribe({
      next: users => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: error => {
        console.error('Failed to load users:', error);
        this.loading.set(false);
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.update(users =>
          users.filter(user => user.id !== id)
        );
      },
      error: error => {
        console.error('Failed to delete user:', error);
      }
    });
  }
}