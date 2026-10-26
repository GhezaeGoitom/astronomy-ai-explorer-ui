import {
Component,
inject,
OnInit,
signal
} from '@angular/core';

import {
ActivatedRoute,
RouterLink
} from '@angular/router';

import { StarService } from '../../../core/services/star/star';
import { Star } from '../models/star.model';
import { AuthService } from '../../../core/auth/auth';

@Component({
selector: 'app-star-detail',
imports: [RouterLink],
templateUrl: './star-detail.html',
styleUrl: './star-detail.css'
})
export class StarDetail implements OnInit {

private readonly route = inject(ActivatedRoute);
private readonly starService = inject(StarService);

readonly authService = inject(AuthService);

readonly star = signal<Star | null>(null);

ngOnInit(): void {


const id = Number(
  this.route.snapshot.paramMap.get('id')
);

this.starService.getById(id).subscribe({

  next: star => {
    this.star.set(star);
  },

  error: error => {
    console.error(
      'Failed to load star:',
      error
    );
  }

});


}
}
