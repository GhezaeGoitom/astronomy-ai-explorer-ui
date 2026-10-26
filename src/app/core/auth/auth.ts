import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  UserRole
} from './auth.models';
import { TokenService } from './token';
import { AppUser, CreateUserRequest } from '../../features/auth/models/user.model';



interface AuthState {
  authenticated: boolean;
  roles: UserRole[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient;
  private readonly tokenService: TokenService;

  private readonly authState = signal<AuthState>({
    authenticated: false,
    roles: []
  });

  readonly isAdmin = computed(
  () => this.authState().roles.includes('ROLE_ADMIN')
);

readonly isScientist = computed(
  () => this.authState().roles.includes('ROLE_SCIENTIST')
);

readonly canModify = computed(() =>
  this.isAdmin() || this.isScientist()
);

  readonly isAuthenticated = this.authState.asReadonly();

  constructor(
    http: HttpClient,
    tokenService: TokenService
  ) {
    this.http = http;
    this.tokenService = tokenService;

    this.restoreAuthState();
  }

// guest registering account

  register(request: CreateUserRequest): Observable<AppUser> {
    return this.http.post<AppUser>(
      `${environment.apiUrl}/auth/register`,
      request
    );
  }




  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${environment.apiUrl}/auth/login`,
        request
      )
      .pipe(
        tap(response => {

          this.tokenService.setToken(response.token);
          this.tokenService.setRoles(response.roles);

          this.authState.set({
            authenticated: true,
            roles: response.roles
          });
        })
      );
  }

  logout(): void {

    this.tokenService.removeToken();
    this.tokenService.removeRoles();

    this.authState.set({
      authenticated: false,
      roles: []
    });
  }

  hasRole(role: UserRole): boolean {
    return this.authState()
      .roles
      .includes(role);
  }

  private restoreAuthState(): void {

    const token = this.tokenService.getToken();
    const roles = this.tokenService.getRoles();

    if (token && roles) {
      this.authState.set({
        authenticated: true,
        roles
      });
    }
  }
}