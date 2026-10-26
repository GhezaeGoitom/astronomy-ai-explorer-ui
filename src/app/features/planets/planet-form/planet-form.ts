import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlanetService } from '../../../core/services/planet/planet';
import { PlanetRequest } from '../models/planet.models';

@Component({
  selector: 'app-planet-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './planet-form.html',
  styleUrl: './planet-form.css'
})
export class PlanetForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly planetService = inject(PlanetService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly planetId = signal<number | null>(null);

  readonly isEditMode = computed(() =>
    this.planetId() !== null
  );

  readonly planetForm = this.formBuilder.group({
  name: this.formBuilder.nonNullable.control(
    '',
    [
      Validators.required,
      Validators.maxLength(100)
    ]
  ),

  objectSize: this.formBuilder.control<number | null>(
    null,
    Validators.min(1)
  ),

  objectMass: this.formBuilder.control<number | null>(
    null,
    Validators.min(1)
  ),

  score: this.formBuilder.control<number | null>(
    null,
    Validators.min(0)
  ),

  description: this.formBuilder.nonNullable.control<string | null>(
    '',
    Validators.maxLength(5000)
  ),

  solarSystemId: this.formBuilder.control<number | null>(
    null
  ),

  discoverId: this.formBuilder.control<number | null>(
    null,
    Validators.required
  )
});

   ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.planetId.set(Number(id));

      this.loadPlanet(this.planetId()!);
    }
  }

  private loadPlanet(id: number): void {

    this.planetService.getById(id).subscribe({

      next: planet => {

        this.planetForm.patchValue({
          name: planet.name,
          objectSize: planet.objectSize,
          objectMass: planet.objectMass,
          score: planet.score,
          description: planet.description,
          solarSystemId: planet.solarSystemId,
          discoverId: planet.discoverId
        });

      },

      error: error => {
        console.error('Failed to load planet:', error);
      }

    });
  }

  submit(): void {

    if (this.planetForm.invalid) {
      this.planetForm.markAllAsTouched();
      return;
    }

    const request: PlanetRequest =
      this.planetForm.getRawValue();

    const id = this.planetId();

    if (id === null) {

      this.create(request);

    } else {

      this.update(id, request);

    }
  }

  private create(request: PlanetRequest): void {

    this.planetService.create(request).subscribe({

      next: () => {
        this.router.navigate(['/planets']);
      },

      error: error => {
        console.error('Failed to create planet:', error);
      }

    });
  }

  private update(
    id: number,
    request: PlanetRequest
  ): void {

    this.planetService.update(id, request).subscribe({

      next: () => {
        this.router.navigate(['/planets']);
      },

      error: error => {
        console.error('Failed to update planet:', error);
      }

    });
  }
}