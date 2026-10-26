import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UniverseService } from '../../../core/services/universe/universe';
import { AuthService } from '../../../core/auth/auth';
import { Universe } from '../universes/universe.models';


@Component({
  selector: 'app-universe-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './universe-list.html',
  styleUrl: './universe-list.css'
})
export class UniverseList implements OnInit {

  private readonly universeService = inject(UniverseService);

  readonly authService = inject(AuthService);

  readonly universes = signal<Universe[]>([]);

  ngOnInit(): void {
    this.loadUniverses();
  }

  loadUniverses(): void {
    this.universeService.getAll().subscribe({
      next: universes => {
        this.universes.set(universes);
      },
      error: error => {
        console.error('Failed to load universes', error);
      }
    });
  }

  deleteUniverse(id: number): void {
    if (!confirm('Are you sure you want to delete this universe?')) {
      return;
    }

    this.universeService.delete(id).subscribe({
      next: () => {
        this.universes.update(
          universes => universes.filter(universe => universe.id !== id)
        );
      },
      error: error => {
        console.error('Failed to delete universe', error);
      }
    });
  }
}