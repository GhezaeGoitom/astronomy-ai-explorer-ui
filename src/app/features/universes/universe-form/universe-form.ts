import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UniverseService } from '../../../core/services/universe/universe';
import { UniverseRequest } from '../universes/universe.models';


@Component({
  selector: 'app-universe-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './universe-form.html',
  styleUrl: './universe-form.css'
})
export class UniverseForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly universeService = inject(UniverseService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly universeId = signal<number | null>(null);

  readonly isEditMode = computed(
    () => this.universeId() !== null
  );

  readonly universeForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.maxLength(5000)],
    coordinate: ['', Validators.maxLength(100)]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.universeId.set(Number(id));
      this.loadUniverse(Number(id));
    }
  }

  private loadUniverse(id: number): void {
    this.universeService.getById(id).subscribe({
      next: universe => {
        this.universeForm.patchValue({
          name: universe.name,
          description: universe.description ?? '',
          coordinate: universe.coordinate ?? ''
        });
      },
      error: error => {
        console.error('Failed to load universe', error);
      }
    });
  }

  submit(): void {

    if (this.universeForm.invalid) {
      this.universeForm.markAllAsTouched();
      return;
    }

    const request: UniverseRequest = this.universeForm.getRawValue();

    const id = this.universeId();

    if (id === null) {
      this.createUniverse(request);
    } else {
      this.updateUniverse(id, request);
    }
  }

  private createUniverse(request: UniverseRequest): void {
    this.universeService.create(request).subscribe({
      next: () => {
        this.router.navigate(['/universes']);
      },
      error: error => {
        console.error('Failed to create universe', error);
      }
    });
  }

  private updateUniverse(
    id: number,
    request: UniverseRequest
  ): void {
    this.universeService.update(id, request).subscribe({
      next: () => {
        this.router.navigate(['/universes']);
      },
      error: error => {
        console.error('Failed to update universe', error);
      }
    });
  }
}