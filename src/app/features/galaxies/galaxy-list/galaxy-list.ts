import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth';
import { GalaxyService } from '../../../core/services/galaxy/galaxy';
import { Galaxy } from '../models/galaxy.model';

@Component({
  selector: 'app-galaxy-list',
  imports: [RouterLink],
  templateUrl: './galaxy-list.html',
  styleUrl: './galaxy-list.css'
})
export class GalaxyList implements OnInit {

  private readonly galaxyService = inject(GalaxyService);

  readonly authService = inject(AuthService);

  readonly galaxies = signal<Galaxy[]>([]);

  ngOnInit(): void {
    this.loadGalaxies();
  }

  private loadGalaxies(): void {

    this.galaxyService.getAll().subscribe({

      next: galaxies => {
        this.galaxies.set(galaxies);
      },

      error: error => {
        console.error(
          'Failed to load galaxies:',
          error
        );
      }

    });
  }

  deleteGalaxy(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this galaxy?'
    );

    if (!confirmed) {
      return;
    }

    this.galaxyService.delete(id).subscribe({

      next: () => {

        this.galaxies.update(galaxies =>
          galaxies.filter(
            galaxy => galaxy.id !== id
          )
        );

      },

      error: error => {
        console.error(
          'Failed to delete galaxy:',
          error
        );
      }

    });
  }
}