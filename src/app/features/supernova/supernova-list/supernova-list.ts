import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupernovaService } from '../../../core/services/supernova/supernova';
import { AuthService } from '../../../core/auth/auth';
import { Supernova } from '../models/supernova.model';


@Component({
  selector: 'app-supernova-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './supernova-list.html',
  styleUrl: './supernova-list.css'
})
export class SupernovaList implements OnInit {

  private readonly supernovaService =
    inject(SupernovaService);

  readonly authService = inject(AuthService);

  readonly supernovae =
    signal<Supernova[]>([]);

  ngOnInit(): void {
    this.loadSupernovae();
  }

  loadSupernovae(): void {
    this.supernovaService.getAll().subscribe({
      next: supernovae => {
        this.supernovae.set(supernovae);
      },
      error: error => {
        console.error(
          'Failed to load supernovae',
          error
        );
      }
    });
  }

  deleteSupernova(id: number): void {

    if (!confirm(
      'Are you sure you want to delete this supernova?'
    )) {
      return;
    }

    this.supernovaService.delete(id).subscribe({
      next: () => {
        this.supernovae.update(
          supernovae =>
            supernovae.filter(
              supernova => supernova.id !== id
            )
        );
      },
      error: error => {
        console.error(
          'Failed to delete supernova',
          error
        );
      }
    });
  }
}