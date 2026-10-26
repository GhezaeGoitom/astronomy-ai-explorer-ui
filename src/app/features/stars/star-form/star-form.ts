import {
  Component,
  computed,
  inject,
  OnInit,
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
import { StarService } from '../../../core/services/star/star';
import { StarRequest } from '../models/star.model';

@Component({
  selector: 'app-star-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './star-form.html',
  styleUrl: './star-form.css'
})
export class StarForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly starService = inject(StarService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly starId = signal<number | null>(null);

  readonly isEditMode = computed(() =>
    this.starId() !== null
  );

  readonly starForm = this.formBuilder.group({

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

      this.starId.set(Number(id));

      this.loadStar(this.starId()!);
    }
  }

  private loadStar(id: number): void {

    this.starService.getById(id).subscribe({

      next: star => {

        this.starForm.patchValue({
          name: star.name,
          objectSize: star.objectSize,
          objectMass: star.objectMass,
          description: star.description,
          solarSystemId: star.solarSystemId,
          discoverId: star.discoverId
        });

      },

      error: error => {
        console.error(
          'Failed to load star:',
          error
        );
      }

    });
  }

  submit(): void {

    if (this.starForm.invalid) {
      this.starForm.markAllAsTouched();
      return;
    }

    const request: StarRequest =
      this.starForm.getRawValue();

    const id = this.starId();

    if (id === null) {

      this.create(request);

    } else {

      this.update(id, request);

    }
  }

  private create(request: StarRequest): void {

    this.starService.create(request).subscribe({

      next: () => {
        this.router.navigate(['/stars']);
      },

      error: error => {
        console.error(
          'Failed to create star:',
          error
        );
      }

    });
  }

  private update(
    id: number,
    request: StarRequest
  ): void {

    this.starService.update(id, request).subscribe({

      next: () => {
        this.router.navigate(['/stars']);
      },

      error: error => {
        console.error(
          'Failed to update star:',
          error
        );
      }

    });
  }
}