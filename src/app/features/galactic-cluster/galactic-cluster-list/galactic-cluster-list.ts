import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GalacticClusterService } from '../../../core/services/galactic-cluster/galactic-cluster';
import { AuthService } from '../../../core/auth/auth';
import { GalacticCluster } from '../models/galactic-cluster.model';


@Component({
  selector: 'app-galactic-cluster-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './galactic-cluster-list.html',
  styleUrl: './galactic-cluster-list.css'
})
export class GalacticClusterList implements OnInit {

  private readonly galacticClusterService =
    inject(GalacticClusterService);

  readonly authService = inject(AuthService);

  readonly galacticClusters =
    signal<GalacticCluster[]>([]);

  ngOnInit(): void {
    this.loadGalacticClusters();
  }

  loadGalacticClusters(): void {
    this.galacticClusterService.getAll().subscribe({
      next: galacticClusters => {
        this.galacticClusters.set(galacticClusters);
      },
      error: error => {
        console.error(
          'Failed to load galactic clusters',
          error
        );
      }
    });
  }

  deleteGalacticCluster(id: number): void {

    if (!confirm(
      'Are you sure you want to delete this galactic cluster?'
    )) {
      return;
    }

    this.galacticClusterService.delete(id).subscribe({
      next: () => {
        this.galacticClusters.update(
          clusters =>
            clusters.filter(cluster => cluster.id !== id)
        );
      },
      error: error => {
        console.error(
          'Failed to delete galactic cluster',
          error
        );
      }
    });
  }
}