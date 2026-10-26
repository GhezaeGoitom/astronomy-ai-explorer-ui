import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  SolarSystemService
} from '../../../core/services/solar-system/solar-system';

import {
  SolarSystem
} from '../models/solar-system.model';

import {
  AuthService
} from '../../../core/auth/auth';


@Component({
  selector: 'app-solar-system-detail',
  imports: [RouterLink],
  templateUrl: './solar-system-detail.html',
  styleUrl: './solar-system-detail.css'
})
export class SolarSystemDetail implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly solarSystemService =
    inject(SolarSystemService);

  readonly authService =
    inject(AuthService);

  readonly solarSystem =
    signal<SolarSystem | null>(null);


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadSolarSystem(id);
  }


  private loadSolarSystem(id: number): void {

    this.solarSystemService
      .getById(id)
      .subscribe({

        next: solarSystem => {
          this.solarSystem.set(solarSystem);
        },

        error: error => {
          console.error(
            'Failed to load solar system:',
            error
          );
        }

      });
  }
}