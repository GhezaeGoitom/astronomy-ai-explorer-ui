import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlanetService } from '../../../core/services/planet/planet';
import { AuthService } from '../../../core/auth/auth';
import { Planet } from '../models/planet.models';


@Component({
  selector: 'app-planet-list',
  imports: [RouterLink],
  templateUrl: './planet-list.html',
  styleUrl: './planet-list.css'
})
export class PlanetList implements OnInit {

  private readonly planetService = inject(PlanetService);
  readonly authService = inject(AuthService);

  readonly planets = signal<Planet[]>([]);

  ngOnInit(): void {
    this.loadPlanets();
  }

  private loadPlanets(): void {

    this.planetService.getAll().subscribe({
      next: planets => {
        this.planets.set(planets);
      },

      error: error => {
        console.error('Failed to load planets:', error);
      }
    });
  }

  deletePlanet(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this planet?'
    );

    if (!confirmed) {
      return;
    }

    this.planetService.delete(id).subscribe({

      next: () => {

        this.planets.update(planets =>
          planets.filter(planet => planet.id !== id)
        );

      },

      error: error => {
        console.error('Failed to delete planet:', error);
      }

    });
  }
}