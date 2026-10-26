import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SemanticSearchResult } from '../../../features/search/models/search.model';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/search`;

  search(query: string, limit: number = 5): Observable<SemanticSearchResult[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('limit', limit);

    return this.http.get<SemanticSearchResult[]>(this.apiUrl, { params });
  }
}