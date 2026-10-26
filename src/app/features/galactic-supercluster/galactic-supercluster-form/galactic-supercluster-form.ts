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
import { GalacticSuperClusterService } from '../../../core/services/galactic-supercluster/galactic-supercluster';
import { GalacticSuperClusterRequest } from '../models/galactic-supercluster.model';


@Component({
  selector: 'app-galactic-supercluster-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './galactic-supercluster-form.html',
  styleUrl: './galactic-supercluster-form.css'
})
export class GalacticSuperClusterForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);

  private readonly service =
    inject(GalacticSuperClusterService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly galacticSuperClusterId =
    signal<number | null>(null);

  readonly isEditMode = computed(
    () => this.galacticSuperClusterId() !== null
  );

  readonly galacticSuperClusterForm =
    this.formBuilder.nonNullable.group({

      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
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

      this.galacticSuperClusterId.set(numericId);

      this.loadGalacticSuperCluster(numericId);
    }
  }

  private loadGalacticSuperCluster(id: number): void {

    this.service.getById(id).subscribe({

      next: cluster => {

        this.galacticSuperClusterForm.patchValue({
          name: cluster.name,
          description: cluster.description ?? ''
        });
      },

      error: error => {
        console.error(
          'Failed to load galactic supercluster',
          error
        );
      }
    });
  }

  submit(): void {

    if (this.galacticSuperClusterForm.invalid) {
      this.galacticSuperClusterForm.markAllAsTouched();
      return;
    }

    const request: GalacticSuperClusterRequest =
      this.galacticSuperClusterForm.getRawValue();

    const id = this.galacticSuperClusterId();

    if (id === null) {
      this.createGalacticSuperCluster(request);
    } else {
      this.updateGalacticSuperCluster(id, request);
    }
  }

  private createGalacticSuperCluster(
    request: GalacticSuperClusterRequest
  ): void {

    this.service.create(request).subscribe({

      next: () => {
        this.router.navigate([
          '/galactic-superclusters'
        ]);
      },

      error: error => {
        console.error(
          'Failed to create galactic supercluster',
          error
        );
      }
    });
  }

  private updateGalacticSuperCluster(
    id: number,
    request: GalacticSuperClusterRequest
  ): void {

    this.service.update(id, request).subscribe({

      next: () => {
        this.router.navigate([
          '/galactic-superclusters'
        ]);
      },

      error: error => {
        console.error(
          'Failed to update galactic supercluster',
          error
        );
      }
    });
  }
}