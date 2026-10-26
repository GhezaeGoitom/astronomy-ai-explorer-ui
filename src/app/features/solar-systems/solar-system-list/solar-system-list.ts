import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth';
import { SolarSystemService } from '../../../core/services/solar-system/solar-system';
import { SolarSystem } from '../models/solar-system.model';


@Component({
  selector: 'app-solar-system-list',
  imports: [RouterLink],
  templateUrl: './solar-system-list.html',
  styleUrl: './solar-system-list.css'
})
export class SolarSystemList implements OnInit {

  private readonly solarSystemService =
    inject(SolarSystemService);

  readonly authService = inject(AuthService);

  readonly solarSystems =
    signal<SolarSystem[]>([]);

  ngOnInit(): void {
    this.loadSolarSystems();
  }

  private loadSolarSystems(): void {

    this.solarSystemService.getAll().subscribe({

      next: solarSystems => {
        this.solarSystems.set(solarSystems);
      },

      error: error => {
        console.error(
          'Failed to load solar systems:',
          error
        );
      }

    });
  }

  deleteSolarSystem(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this solar system?'
    );

    if (!confirmed) {
      return;
    }

    this.solarSystemService.delete(id).subscribe({

      next: () => {

        this.solarSystems.update(solarSystems =>
          solarSystems.filter(
            solarSystem => solarSystem.id !== id
          )
        );

      },

      error: error => {
        console.error(
          'Failed to delete solar system:',
          error
        );
      }

    });
  }
}