import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Universe, UniverseRequest } from '../../../features/universes/universes/universe.models';


@Injectable({
  providedIn: 'root'
})
export class UniverseService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/universes`;

  getAll(): Observable<Universe[]> {
    return this.http.get<Universe[]>(this.apiUrl);
  }

  getById(id: number): Observable<Universe> {
    return this.http.get<Universe>(`${this.apiUrl}/${id}`);
  }

  create(request: UniverseRequest): Observable<Universe> {
    return this.http.post<Universe>(this.apiUrl, request);
  }

  update(id: number, request: UniverseRequest): Observable<Universe> {
    return this.http.put<Universe>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}