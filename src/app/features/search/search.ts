import {
  Component,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SearchService } from '../../core/services/search/search';

import { SemanticSearchResult } from './models/search.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent {

  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  readonly query = signal('');
  readonly results = signal<SemanticSearchResult[]>([]);
  readonly isSearching = signal(false);

  search(): void {

    const query = this.query().trim();

    if (!query) {
      this.results.set([]);
      return;
    }

    this.isSearching.set(true);

    this.searchService.search(query).subscribe({

      next: results => {
        this.results.set(results);
        this.isSearching.set(false);
      },

      error: error => {
        console.error('Semantic search failed:', error);
        this.isSearching.set(false);
      }

    });
  }


  viewEntity(result: SemanticSearchResult): void {

    const route = this.getEntityRoute(
      result.entityType
    );

    if (!route) {
      console.warn(
        'Unknown entity type:',
        result.entityType
      );

      return;
    }

    this.router.navigate([
      route,
      result.entityId
    ]);
  }


  private getEntityRoute(
    entityType: string
  ): string | null {

    switch (entityType.toUpperCase()) {

      case 'PLANET':
        return '/planets';

      case 'STAR':
        return '/stars';

      case 'GALAXY':
        return '/galaxies';

      case 'SOLAR_SYSTEM':
        return '/solar-systems';

      case 'UNIVERSE':
        return '/universes';

      case 'GALACTIC_CLUSTER':
        return '/galactic-clusters';

      case 'GALACTIC_SUPERCLUSTER':
        return '/galactic-superclusters';

      case 'SUPERNOVA':
        return '/supernovae';

      case 'BLACK_HOLE':
        return '/black-holes';

      default:
        return null;
    }
  }
}