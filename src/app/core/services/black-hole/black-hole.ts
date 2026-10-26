import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BlackHole, BlackHoleRequest } from '../../../features/black-hole/models/black-hole.model';


@Injectable({
  providedIn: 'root'
})
export class BlackHoleService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/black-holes`;

  getAll(): Observable<BlackHole[]> {
    return this.http.get<BlackHole[]>(this.apiUrl);
  }

  getById(id: number): Observable<BlackHole> {
    return this.http.get<BlackHole>(
      `${this.apiUrl}/${id}`
    );
  }

  create(request: BlackHoleRequest): Observable<BlackHole> {
    return this.http.post<BlackHole>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: BlackHoleRequest
  ): Observable<BlackHole> {
    return this.http.put<BlackHole>(
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