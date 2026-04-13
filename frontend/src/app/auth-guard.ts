import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  authService.isAuthenticated$.subscribe(isAuthenticated=>{
    if (!isAuthenticated){
      authService.loginWithRedirect()
    }
  })
  return authService.isAuthenticated$
};
