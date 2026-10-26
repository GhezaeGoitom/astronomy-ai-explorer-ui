export type UserRole =
  | 'ROLE_ADMIN'
  | 'ROLE_SCIENTIST'
  | 'ROLE_GUEST';

export interface AppUser {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  roles: UserRole[];
  hasPersonProfile: boolean;
  createdAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  enabled: boolean;
}

export interface UpdateUserRequest {
  username: string;
  email: string;
  enabled: boolean;
}

export interface RoleUpdateRequest {
  roles: number[];
}

export interface AppRole {
  id: number;
  name: UserRole;
}