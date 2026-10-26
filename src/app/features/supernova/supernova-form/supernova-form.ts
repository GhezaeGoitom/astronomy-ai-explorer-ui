import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { SupernovaService } from '../../../core/services/supernova/supernova';
import { SupernovaRequest } from '../models/supernova.model';


@Component({
  selector: 'app-supernova-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './supernova-form.html',
  styleUrl: './supernova-form.css'
})
export class SupernovaForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);

  private readonly supernovaService =
    inject(SupernovaService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly supernovaId =
    signal<number | null>(null);

  readonly isEditMode = computed(
    () => this.supernovaId() !== null
  );

  readonly supernovaForm =
    this.formBuilder.nonNullable.group({

      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      brightness:
        this.formBuilder.control<number | null>(
          null,
          Validators.required
        ),

      universeId: [
        0,
        Validators.required
      ],

      discoverId: [
        0,
        Validators.required
      ],

      description: [
        '',
        Validators.maxLength(5000)
      ]
    });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      const numericId = Number(id);

      this.supernovaId.set(numericId);

      this.loadSupernova(numericId);
    }
  }

  private loadSupernova(id: number): void {

    this.supernovaService.getById(id).subscribe({

      next: supernova => {

        this.supernovaForm.patchValue({
          name: supernova.name,
          brightness: supernova.brightness,
          universeId: supernova.universeId,
          discoverId: supernova.discoverId,
          description: supernova.description ?? ''
        });
      },

      error: error => {
        console.error(
          'Failed to load supernova',
          error
        );
      }
    });
  }

  submit(): void {

    if (this.supernovaForm.invalid) {
      this.supernovaForm.markAllAsTouched();
      return;
    }

    const request: SupernovaRequest =
      this.supernovaForm.getRawValue();

    const id = this.supernovaId();

    if (id === null) {
      this.createSupernova(request);
    } else {
      this.updateSupernova(id, request);
    }
  }

  private createSupernova(
    request: SupernovaRequest
  ): void {

    this.supernovaService.create(request).subscribe({

      next: () => {
        this.router.navigate(['/supernovae']);
      },

      error: error => {
        console.error(
          'Failed to create supernova',
          error
        );
      }
    });
  }

  private updateSupernova(
    id: number,
    request: SupernovaRequest
  ): void {

    this.supernovaService.update(id, request).subscribe({

      next: () => {
        this.router.navigate(['/supernovae']);
      },

      error: error => {
        console.error(
          'Failed to update supernova',
          error
        );
      }
    });
  }
}