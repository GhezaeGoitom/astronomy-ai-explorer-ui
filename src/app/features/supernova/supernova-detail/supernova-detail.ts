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
  SupernovaService
} from '../../../core/services/supernova/supernova';

import {
  Supernova
} from '../models/supernova.model';

import {
  AuthService
} from '../../../core/auth/auth';


@Component({
  selector: 'app-supernova-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './supernova-detail.html',
  styleUrl: './supernova-detail.css'
})
export class SupernovaDetail implements OnInit {

  private readonly supernovaService =
    inject(SupernovaService);

  private readonly route =
    inject(ActivatedRoute);

  readonly authService =
    inject(AuthService);

  readonly supernova =
    signal<Supernova | null>(null);


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadSupernova(id);
  }


  private loadSupernova(id: number): void {

    this.supernovaService
      .getById(id)
      .subscribe({

        next: supernova => {
          this.supernova.set(supernova);
        },

        error: error => {
          console.error(
            'Failed to load supernova:',
            error
          );
        }

      });
  }
}