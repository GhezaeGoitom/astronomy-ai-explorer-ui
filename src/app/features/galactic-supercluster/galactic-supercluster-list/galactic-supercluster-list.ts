import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GalacticSuperClusterService } from '../../../core/services/galactic-supercluster/galactic-supercluster';
import { GalacticSuperCluster } from '../models/galactic-supercluster.model';
import { AuthService } from '../../../core/auth/auth';


@Component({
  selector: 'app-galactic-supercluster-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './galactic-supercluster-list.html',
  styleUrl: './galactic-supercluster-list.css'
})
export class GalacticSuperClusterList implements OnInit {

  private readonly service =
    inject(GalacticSuperClusterService);

  readonly authService = inject(AuthService);

  readonly galacticSuperClusters =
    signal<GalacticSuperCluster[]>([]);

  ngOnInit(): void {
    this.loadGalacticSuperClusters();
  }

  loadGalacticSuperClusters(): void {
    this.service.getAll().subscribe({
      next: clusters => {
        this.galacticSuperClusters.set(clusters);
      },
      error: error => {
        console.error(
          'Failed to load galactic superclusters',
          error
        );
      }
    });
  }

  deleteGalacticSuperCluster(id: number): void {

    if (!confirm(
      'Are you sure you want to delete this galactic supercluster?'
    )) {
      return;
    }

    this.service.delete(id).subscribe({
      next: () => {
        this.galacticSuperClusters.update(
          clusters =>
            clusters.filter(cluster => cluster.id !== id)
        );
      },
      error: error => {
        console.error(
          'Failed to delete galactic supercluster',
          error
        );
      }
    });
  }
}