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
  BlackHoleService
} from '../../../core/services/black-hole/black-hole';

import {
  BlackHole
} from '../models/black-hole.model';

import {
  AuthService
} from '../../../core/auth/auth';


@Component({
  selector: 'app-black-hole-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './black-hole-detail.html',
  styleUrl: './black-hole-detail.css'
})
export class BlackHoleDetail implements OnInit {

  private readonly blackHoleService =
    inject(BlackHoleService);

  private readonly route =
    inject(ActivatedRoute);

  readonly authService =
    inject(AuthService);

  readonly blackHole =
    signal<BlackHole | null>(null);


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadBlackHole(id);
  }


  private loadBlackHole(id: number): void {

    this.blackHoleService
      .getById(id)
      .subscribe({

        next: blackHole => {
          this.blackHole.set(blackHole);
        },

        error: error => {
          console.error(
            'Failed to load black hole:',
            error
          );
        }

      });
  }
}