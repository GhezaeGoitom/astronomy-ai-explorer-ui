import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  RouterLink,
  ActivatedRoute
} from '@angular/router';

import {
  UniverseService
} from '../../../core/services/universe/universe';

import {
  Universe
} from '../universes/universe.models';

import {
  AuthService
} from '../../../core/auth/auth';


@Component({
  selector: 'app-universe-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './universe-detail.html',
  styleUrl: './universe-detail.css'
})
export class UniverseDetail implements OnInit {

  private readonly universeService =
    inject(UniverseService);

  private readonly route =
    inject(ActivatedRoute);

  readonly authService =
    inject(AuthService);

  readonly universe =
    signal<Universe | null>(null);


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadUniverse(id);
  }


  private loadUniverse(id: number): void {

    this.universeService
      .getById(id)
      .subscribe({

        next: universe => {
          this.universe.set(universe);
        },

        error: error => {
          console.error(
            'Failed to load universe:',
            error
          );
        }

      });
  }
}