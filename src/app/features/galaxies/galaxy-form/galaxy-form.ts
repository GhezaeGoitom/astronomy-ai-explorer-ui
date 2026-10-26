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
import { GalaxyService } from '../../../core/services/galaxy/galaxy';
import { GalaxyRequest } from '../models/galaxy.model';


@Component({
  selector: 'app-galaxy-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './galaxy-form.html',
  styleUrl: './galaxy-form.css'
})
export class GalaxyForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly galaxyService = inject(GalaxyService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly galaxyId = signal<number | null>(null);

  readonly isEditMode = computed(() =>
    this.galaxyId() !== null
  );

  readonly galaxyForm = this.formBuilder.group({

    name: this.formBuilder.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ),

    universeId: this.formBuilder.control<number | null>(
      null,
      Validators.required
    ),

    galacticClusterId:
      this.formBuilder.control<number | null>(
        null
      ),

    description:
      this.formBuilder.nonNullable.control<string | null>(
        '',
        Validators.maxLength(5000)
      ),

    discoverId:
      this.formBuilder.control<number | null>(
        null,
        Validators.required
      )

  });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.galaxyId.set(Number(id));

      this.loadGalaxy(this.galaxyId()!);
    }
  }

  private loadGalaxy(id: number): void {

    this.galaxyService.getById(id).subscribe({

      next: galaxy => {

        this.galaxyForm.patchValue({

          name: galaxy.name,

          universeId:
            galaxy.universeId,

          galacticClusterId:
            galaxy.galacticClusterId,

          description:
            galaxy.description,

          discoverId:
            galaxy.discoverId

        });

      },

      error: error => {
        console.error(
          'Failed to load galaxy:',
          error
        );
      }

    });
  }

  submit(): void {

    if (this.galaxyForm.invalid) {

      this.galaxyForm.markAllAsTouched();

      return;
    }

    const request: GalaxyRequest =
      this.galaxyForm.getRawValue();

    const id = this.galaxyId();

    if (id === null) {

      this.create(request);

    } else {

      this.update(id, request);

    }
  }

  private create(request: GalaxyRequest): void {

    this.galaxyService.create(request).subscribe({

      next: () => {
        this.router.navigate(['/galaxies']);
      },

      error: error => {
        console.error(
          'Failed to create galaxy:',
          error
        );
      }

    });
  }

  private update(
    id: number,
    request: GalaxyRequest
  ): void {

    this.galaxyService.update(id, request).subscribe({

      next: () => {
        this.router.navigate(['/galaxies']);
      },

      error: error => {
        console.error(
          'Failed to update galaxy:',
          error
        );
      }

    });
  }
}