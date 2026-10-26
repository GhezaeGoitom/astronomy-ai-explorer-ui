import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlackHoleService } from '../../../core/services/black-hole/black-hole';
import { AuthService } from '../../../core/auth/auth';
import { BlackHole } from '../models/black-hole.model';


@Component({
  selector: 'app-black-hole-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './black-hole-list.html',
  styleUrl: './black-hole-list.css'
})
export class BlackHoleList implements OnInit {

  private readonly blackHoleService =
    inject(BlackHoleService);

  readonly authService = inject(AuthService);

  readonly blackHoles =
    signal<BlackHole[]>([]);

  ngOnInit(): void {
    this.loadBlackHoles();
  }

  loadBlackHoles(): void {
    this.blackHoleService.getAll().subscribe({
      next: blackHoles => {
        this.blackHoles.set(blackHoles);
      },
      error: error => {
        console.error(
          'Failed to load black holes',
          error
        );
      }
    });
  }

  deleteBlackHole(id: number): void {

    if (!confirm(
      'Are you sure you want to delete this black hole?'
    )) {
      return;
    }

    this.blackHoleService.delete(id).subscribe({
      next: () => {
        this.blackHoles.update(
          blackHoles =>
            blackHoles.filter(
              blackHole => blackHole.id !== id
            )
        );
      },
      error: error => {
        console.error(
          'Failed to delete black hole',
          error
        );
      }
    });
  }
}