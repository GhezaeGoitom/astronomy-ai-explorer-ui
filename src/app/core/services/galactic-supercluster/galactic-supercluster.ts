import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GalacticSuperCluster, GalacticSuperClusterRequest } from '../../../features/galactic-supercluster/models/galactic-supercluster.model';



@Injectable({
  providedIn: 'root'
})
export class GalacticSuperClusterService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/galactic-superclusters`;

  getAll(): Observable<GalacticSuperCluster[]> {
    return this.http.get<GalacticSuperCluster[]>(this.apiUrl);
  }

  getById(id: number): Observable<GalacticSuperCluster> {
    return this.http.get<GalacticSuperCluster>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    request: GalacticSuperClusterRequest
  ): Observable<GalacticSuperCluster> {
    return this.http.post<GalacticSuperCluster>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: GalacticSuperClusterRequest
  ): Observable<GalacticSuperCluster> {
    return this.http.put<GalacticSuperCluster>(
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