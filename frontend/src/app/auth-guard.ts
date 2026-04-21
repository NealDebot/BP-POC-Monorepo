import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { inject } from '@angular/core';
import {filter, take, tap, switchMap} from 'rxjs'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  return authService.isLoading$.pipe(
    filter((loading) => !loading),
    take(1),
    switchMap(() => authService.isAuthenticated$),
    take(1),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        authService.loginWithRedirect();
      }
    }),
  );
};
