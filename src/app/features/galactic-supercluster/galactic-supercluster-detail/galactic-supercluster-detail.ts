import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  GalacticSuperClusterService
} from '../../../core/services/galactic-supercluster/galactic-supercluster';

import {
  GalacticSuperCluster
} from '../models/galactic-supercluster.model';

import {
  AuthService
} from '../../../core/auth/auth';


@Component({
  selector: 'app-galactic-supercluster-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './galactic-supercluster-detail.html',
  styleUrl: './galactic-supercluster-detail.css'
})
export class GalacticSuperClusterDetail implements OnInit {

  private readonly service =
    inject(GalacticSuperClusterService);

  private readonly route =
    inject(ActivatedRoute);

  readonly authService =
    inject(AuthService);

  readonly galacticSuperCluster =
    signal<GalacticSuperCluster | null>(null);


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadGalacticSuperCluster(id);
  }


  private loadGalacticSuperCluster(id: number): void {

    this.service
      .getById(id)
      .subscribe({

        next: cluster => {
          this.galacticSuperCluster.set(cluster);
        },

        error: error => {
          console.error(
            'Failed to load galactic supercluster:',
            error
          );
        }

      });
  }
}