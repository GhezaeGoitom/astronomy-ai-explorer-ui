import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppRole, AppUser, CreateUserRequest, RoleUpdateRequest, UpdateUserRequest } from '../../../features/auth/models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/users`;

  getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.apiUrl);
  }

  getUser(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.apiUrl}/${id}`);
  }

  createUser(request: CreateUserRequest): Observable<AppUser> {
    return this.http.post<AppUser>(
      this.apiUrl,
      request
    );
  }


  updateUser(
    id: number,
    request: UpdateUserRequest
  ): Observable<AppUser> {
    return this.http.put<AppUser>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getRoles(): Observable<AppRole[]> {
    return this.http.get<AppRole[]>(
      `${environment.apiUrl}/roles`
    );
  }

  updateRoles(
    userId: number,
    request: number[]
  ): Observable<AppUser> {
    return this.http.put<AppUser>(
      `${this.apiUrl}/${userId}/roles`,
      request
    );
  }
}