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

import { GalaxyService } from '../../../core/services/galaxy/galaxy';
import { Galaxy } from '../models/galaxy.model';
import { AuthService } from '../../../core/auth/auth';

@Component({
selector: 'app-galaxy-detail',
imports: [RouterLink],
templateUrl: './galaxy-detail.html',
styleUrl: './galaxy-detail.css'
})
export class GalaxyDetail implements OnInit {

private readonly route = inject(ActivatedRoute);

private readonly galaxyService =
inject(GalaxyService);

readonly authService = inject(AuthService);

readonly galaxy = signal<Galaxy | null>(null);

ngOnInit(): void {


const id = Number(
  this.route.snapshot.paramMap.get('id')
);

this.galaxyService.getById(id).subscribe({

  next: galaxy => {
    this.galaxy.set(galaxy);
  },

  error: error => {
    console.error(
      'Failed to load galaxy:',
      error
    );
  }

});


}
}
