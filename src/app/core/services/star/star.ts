import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Star, StarRequest } from '../../../features/stars/models/star.model';


@Injectable({
  providedIn: 'root'
})
export class StarService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/stars`;

  getAll(): Observable<Star[]> {
    return this.http.get<Star[]>(this.apiUrl);
  }

  getById(id: number): Observable<Star> {
    return this.http.get<Star>(
      `${this.apiUrl}/${id}`
    );
  }

  create(request: StarRequest): Observable<Star> {
    return this.http.post<Star>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: StarRequest
  ): Observable<Star> {
    return this.http.put<Star>(
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