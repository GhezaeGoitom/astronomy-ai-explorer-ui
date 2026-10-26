import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Supernova, SupernovaRequest } from '../../../features/supernova/models/supernova.model';

@Injectable({
  providedIn: 'root'
})
export class SupernovaService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/supernovae`;

  getAll(): Observable<Supernova[]> {
    return this.http.get<Supernova[]>(this.apiUrl);
  }

  getById(id: number): Observable<Supernova> {
    return this.http.get<Supernova>(
      `${this.apiUrl}/${id}`
    );
  }

  create(request: SupernovaRequest): Observable<Supernova> {
    return this.http.post<Supernova>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: SupernovaRequest
  ): Observable<Supernova> {
    return this.http.put<Supernova>(
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