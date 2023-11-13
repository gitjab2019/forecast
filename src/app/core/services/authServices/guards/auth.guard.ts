import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoged = authService.checkAuthentication();
  if(!isLoged) router.navigate(["/auth/login"]);
  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoged = authService.isAdminUser();
  if(!isLoged) router.navigate(["/main"]);
  return true;
};

