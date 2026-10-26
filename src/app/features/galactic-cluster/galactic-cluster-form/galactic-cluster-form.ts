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
import { GalacticClusterService } from '../../../core/services/galactic-cluster/galactic-cluster';
import { GalacticClusterRequest } from '../models/galactic-cluster.model';


@Component({
  selector: 'app-galactic-cluster-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './galactic-cluster-form.html',
  styleUrl:'./galactic-cluster-form.css'
})
export class GalacticClusterForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);

  private readonly galacticClusterService =
    inject(GalacticClusterService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly galacticClusterId =
    signal<number | null>(null);

  readonly isEditMode = computed(
    () => this.galacticClusterId() !== null
  );

  readonly galacticClusterForm =
    this.formBuilder.nonNullable.group({

      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      galacticSuperClusterId:
        this.formBuilder.control<number | null>(null),

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

      this.galacticClusterId.set(numericId);

      this.loadGalacticCluster(numericId);
    }
  }

  private loadGalacticCluster(id: number): void {

    this.galacticClusterService.getById(id).subscribe({

      next: cluster => {

        this.galacticClusterForm.patchValue({
          name: cluster.name,
          galacticSuperClusterId:
            cluster.galacticSuperClusterId,
          description: cluster.description ?? ''
        });
      },

      error: error => {
        console.error(
          'Failed to load galactic cluster',
          error
        );
      }
    });
  }

  submit(): void {

    if (this.galacticClusterForm.invalid) {
      this.galacticClusterForm.markAllAsTouched();
      return;
    }

    const request: GalacticClusterRequest =
      this.galacticClusterForm.getRawValue();

    const id = this.galacticClusterId();

    if (id === null) {
      this.createGalacticCluster(request);
    } else {
      this.updateGalacticCluster(id, request);
    }
  }

  private createGalacticCluster(
    request: GalacticClusterRequest
  ): void {

    this.galacticClusterService.create(request).subscribe({

      next: () => {
        this.router.navigate(['/galactic-clusters']);
      },

      error: error => {
        console.error(
          'Failed to create galactic cluster',
          error
        );
      }
    });
  }

  private updateGalacticCluster(
    id: number,
    request: GalacticClusterRequest
  ): void {

    this.galacticClusterService
      .update(id, request)
      .subscribe({

        next: () => {
          this.router.navigate(['/galactic-clusters']);
        },

        error: error => {
          console.error(
            'Failed to update galactic cluster',
            error
          );
        }
      });
  }
}