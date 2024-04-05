import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  let tokenExist: boolean = false
  authService.getTokenState().subscribe(hasToken => {
    tokenExist = hasToken
  })
  if (tokenExist) {
    return true
  } else {
    router.navigateByUrl("/login")
    return false;
  }
};
