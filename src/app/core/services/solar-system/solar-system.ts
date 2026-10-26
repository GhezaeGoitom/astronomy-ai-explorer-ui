import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolarSystem, SolarSystemRequest } from '../../../features/solar-systems/models/solar-system.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SolarSystemService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/solar-systems`;

  getAll(): Observable<SolarSystem[]> {
    return this.http.get<SolarSystem[]>(this.apiUrl);
  }

  getById(id: number): Observable<SolarSystem> {
    return this.http.get<SolarSystem>(
      `${this.apiUrl}/${id}`
    );
  }

  create(request: SolarSystemRequest): Observable<SolarSystem> {
    return this.http.post<SolarSystem>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: SolarSystemRequest
  ): Observable<SolarSystem> {
    return this.http.put<SolarSystem>(
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