import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Planet, PlanetRequest } from '../../../features/planets/models/planet.models';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getAll(): Observable<Planet[]> {
    return this.http.get<Planet[]>(
      `${environment.apiUrl}/planets`
    );
  }

  getById(id: number): Observable<Planet> {
    return this.http.get<Planet>(
      `${environment.apiUrl}/planets/${id}`
    );
  }

  create(request: PlanetRequest): Observable<Planet> {
    return this.http.post<Planet>(
      `${environment.apiUrl}/planets`,
      request
    );
  }

  update(
    id: number,
    request: PlanetRequest
  ): Observable<Planet> {
    return this.http.put<Planet>(
      `${environment.apiUrl}/planets/${id}`,
      request
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/planets/${id}`
    );
  }
}