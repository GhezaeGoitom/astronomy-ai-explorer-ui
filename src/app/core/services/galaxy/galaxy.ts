import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Galaxy, GalaxyRequest } from '../../../features/galaxies/models/galaxy.model';


@Injectable({
  providedIn: 'root'
})
export class GalaxyService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/galaxies`;

  getAll(): Observable<Galaxy[]> {
    return this.http.get<Galaxy[]>(this.apiUrl);
  }

  getById(id: number): Observable<Galaxy> {
    return this.http.get<Galaxy>(
      `${this.apiUrl}/${id}`
    );
  }

  create(request: GalaxyRequest): Observable<Galaxy> {
    return this.http.post<Galaxy>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: GalaxyRequest
  ): Observable<Galaxy> {
    return this.http.put<Galaxy>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}