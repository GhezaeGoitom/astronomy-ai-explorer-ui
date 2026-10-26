import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlanetService } from '../../../core/services/planet/planet';
import { Planet } from '../models/planet.models';
import { AuthService } from '../../../core/auth/auth';



@Component({
  selector: 'app-planet-detail',
  imports: [RouterLink],
  templateUrl: './planet-detail.html',
  styleUrl: './planet-detail.css'
})
export class PlanetDetail implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly planetService = inject(PlanetService);
  readonly authService = inject(AuthService);

  readonly planet = signal<Planet | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadPlanet(id);
  }

  private loadPlanet(id: number): void {

    this.planetService.getById(id).subscribe({

      next: planet => {
        this.planet.set(planet);
      },

      error: error => {
        console.error('Failed to load planet:', error);
      }

    });
  }
}