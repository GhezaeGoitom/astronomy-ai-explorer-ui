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
  GalacticClusterService
} from '../../../core/services/galactic-cluster/galactic-cluster';

import {
  GalacticCluster
} from '../models/galactic-cluster.model';

import {
  AuthService
} from '../../../core/auth/auth';


@Component({
  selector: 'app-galactic-cluster-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './galactic-cluster-detail.html',
  styleUrl: './galactic-cluster-detail.css'
})
export class GalacticClusterDetail implements OnInit {

  private readonly galacticClusterService =
    inject(GalacticClusterService);

  private readonly route =
    inject(ActivatedRoute);

  readonly authService =
    inject(AuthService);

  readonly galacticCluster =
    signal<GalacticCluster | null>(null);


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadGalacticCluster(id);
  }


  private loadGalacticCluster(id: number): void {

    this.galacticClusterService
      .getById(id)
      .subscribe({

        next: cluster => {
          this.galacticCluster.set(cluster);
        },

        error: error => {
          console.error(
            'Failed to load galactic cluster:',
            error
          );
        }

      });
  }
}