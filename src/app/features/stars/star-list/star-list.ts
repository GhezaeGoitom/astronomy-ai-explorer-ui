import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { AuthService } from '../../../core/auth/auth';
import { StarService } from '../../../core/services/star/star';
import { Star } from '../models/star.model';

@Component({
  selector: 'app-star-list',
  imports: [RouterLink],
  templateUrl: './star-list.html',
  styleUrl: './star-list.css'
})
export class StarList implements OnInit {

  private readonly starService = inject(StarService);

  readonly authService = inject(AuthService);

  readonly stars = signal<Star[]>([]);

  ngOnInit(): void {
    this.loadStars();
  }

  private loadStars(): void {

    this.starService.getAll().subscribe({

      next: stars => {
        this.stars.set(stars);
      },

      error: error => {
        console.error(
          'Failed to load stars:',
          error
        );
      }

    });
  }

  deleteStar(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this star?'
    );

    if (!confirmed) {
      return;
    }

    this.starService.delete(id).subscribe({

      next: () => {

        this.stars.update(stars =>
          stars.filter(star => star.id !== id)
        );

      },

      error: error => {
        console.error(
          'Failed to delete star:',
          error
        );
      }

    });
  }
}