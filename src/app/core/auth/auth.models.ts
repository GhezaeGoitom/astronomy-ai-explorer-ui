export type UserRole =
  | 'ROLE_GUEST'
  | 'ROLE_SCIENTIST'
  | 'ROLE_ADMIN';


export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  roles: [];
}

interface AuthState {
  roles: UserRole[];
}