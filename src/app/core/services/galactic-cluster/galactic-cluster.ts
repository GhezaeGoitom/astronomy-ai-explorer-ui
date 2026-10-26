import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GalacticCluster, GalacticClusterRequest } from '../../../features/galactic-cluster/models/galactic-cluster.model';


@Injectable({
  providedIn: 'root'
})
export class GalacticClusterService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/galactic-clusters`;

  getAll(): Observable<GalacticCluster[]> {
    return this.http.get<GalacticCluster[]>(this.apiUrl);
  }

  getById(id: number): Observable<GalacticCluster> {
    return this.http.get<GalacticCluster>(`${this.apiUrl}/${id}`);
  }

  create(request: GalacticClusterRequest): Observable<GalacticCluster> {
    return this.http.post<GalacticCluster>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: GalacticClusterRequest
  ): Observable<GalacticCluster> {
    return this.http.put<GalacticCluster>(
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