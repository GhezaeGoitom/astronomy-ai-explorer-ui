import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../auth/auth';
import { UserRole } from '../auth/auth.models';

export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles =
    route.data['roles'] as UserRole[];

  const hasRole = allowedRoles.some(
    role => authService.hasRole(role)
  );

  if (hasRole) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};