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
import { SolarSystemService } from '../../../core/services/solar-system/solar-system';
import { SolarSystemRequest } from '../models/solar-system.model';


@Component({
  selector: 'app-solar-system-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './solar-system-form.html',
  styleUrl: './solar-system-form.css'
})
export class SolarSystemForm implements OnInit {

  private readonly formBuilder =
    inject(FormBuilder);

  private readonly solarSystemService =
    inject(SolarSystemService);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly solarSystemId =
    signal<number | null>(null);

  readonly isEditMode = computed(() =>
    this.solarSystemId() !== null
  );

  readonly solarSystemForm =
    this.formBuilder.group({

      name: this.formBuilder.nonNullable.control(
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),

      galaxyId:
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

      this.solarSystemId.set(Number(id));

      this.loadSolarSystem(
        this.solarSystemId()!
      );
    }
  }

  private loadSolarSystem(id: number): void {

    this.solarSystemService
      .getById(id)
      .subscribe({

        next: solarSystem => {

          this.solarSystemForm.patchValue({

            name: solarSystem.name,

            galaxyId:
              solarSystem.galaxyId,

            description:
              solarSystem.description,

            discoverId:
              solarSystem.discoverId

          });

        },

        error: error => {
          console.error(
            'Failed to load solar system:',
            error
          );
        }

      });
  }

  submit(): void {

    if (this.solarSystemForm.invalid) {

      this.solarSystemForm.markAllAsTouched();

      return;
    }

    const request: SolarSystemRequest =
      this.solarSystemForm.getRawValue();

    const id = this.solarSystemId();

    if (id === null) {

      this.create(request);

    } else {

      this.update(id, request);

    }
  }

  private create(
    request: SolarSystemRequest
  ): void {

    this.solarSystemService
      .create(request)
      .subscribe({

        next: () => {
          this.router.navigate([
            '/solar-systems'
          ]);
        },

        error: error => {
          console.error(
            'Failed to create solar system:',
            error
          );
        }

      });
  }

  private update(
    id: number,
    request: SolarSystemRequest
  ): void {

    this.solarSystemService
      .update(id, request)
      .subscribe({

        next: () => {
          this.router.navigate([
            '/solar-systems'
          ]);
        },

        error: error => {
          console.error(
            'Failed to update solar system:',
            error
          );
        }

      });
  }
}