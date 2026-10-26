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
import { BlackHoleService } from '../../../core/services/black-hole/black-hole';
import { BlackHoleRequest } from '../models/black-hole.model';



@Component({
  selector: 'app-black-hole-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './black-hole-form.html',
  styleUrl: './black-hole-form.css'

})
export class BlackHoleForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);

  private readonly blackHoleService =
    inject(BlackHoleService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly blackHoleId =
    signal<number | null>(null);

  readonly isEditMode = computed(
    () => this.blackHoleId() !== null
  );

  readonly blackHoleForm =
    this.formBuilder.nonNullable.group({

      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      objectSize:
        this.formBuilder.control<number | null>(
          null,
          Validators.required
        ),

      objectMass:
        this.formBuilder.control<number | null>(
          null,
          Validators.required
        ),

      description: [
        '',
        Validators.maxLength(5000)
      ],

      galaxyId:
        this.formBuilder.control<number | null>(
          null
        ),

      discoverId:
        this.formBuilder.control<number | null>(
          null
        )
    });

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      const numericId = Number(id);

      this.blackHoleId.set(numericId);

      this.loadBlackHole(numericId);
    }
  }

  private loadBlackHole(id: number): void {

    this.blackHoleService.getById(id).subscribe({

      next: blackHole => {

        this.blackHoleForm.patchValue({
          name: blackHole.name,
          objectSize: blackHole.objectSize,
          objectMass: blackHole.objectMass,
          description: blackHole.description ?? '',
          galaxyId: blackHole.galaxyId,
          discoverId: blackHole.discoverId
        });
      },

      error: error => {
        console.error(
          'Failed to load black hole',
          error
        );
      }
    });
  }

  submit(): void {

    if (this.blackHoleForm.invalid) {
      this.blackHoleForm.markAllAsTouched();
      return;
    }

    const request: BlackHoleRequest =
      this.blackHoleForm.getRawValue();

    const id = this.blackHoleId();

    if (id === null) {
      this.createBlackHole(request);
    } else {
      this.updateBlackHole(id, request);
    }
  }

  private createBlackHole(
    request: BlackHoleRequest
  ): void {

    this.blackHoleService.create(request).subscribe({

      next: () => {
        this.router.navigate(['/black-holes']);
      },

      error: error => {
        console.error(
          'Failed to create black hole',
          error
        );
      }
    });
  }

  private updateBlackHole(
    id: number,
    request: BlackHoleRequest
  ): void {

    this.blackHoleService.update(id, request).subscribe({

      next: () => {
        this.router.navigate(['/black-holes']);
      },

      error: error => {
        console.error(
          'Failed to update black hole',
          error
        );
      }
    });
  }
}