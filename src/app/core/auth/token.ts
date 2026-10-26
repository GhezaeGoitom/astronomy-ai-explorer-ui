import { Injectable } from '@angular/core';

import { UserRole } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly tokenKey = 'astronomy_access_token';
  private readonly rolesKey = 'astronomy_roles';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setRoles(roles: UserRole[]): void {
    localStorage.setItem(
      this.rolesKey,
      JSON.stringify(roles)
    );
  }

  getRoles(): UserRole[] | null {

    const roles = localStorage.getItem(this.rolesKey);

    if (!roles) {
      return null;
    }

    return JSON.parse(roles) as UserRole[];
  }

  removeRoles(): void {
    localStorage.removeItem(this.rolesKey);
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }
}