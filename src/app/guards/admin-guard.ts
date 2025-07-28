import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return auth.getAdminStatus().pipe(
    take(1),
    map((isAdmin) => {
      if (isAdmin && auth.isAuthenticated()) {
        return true;
      } else {
        if (auth.isAuthenticated()) {
          console.warn('Access denied: User is not an admin');
          alert('Alert');
          router.navigate(['/landing']);
        } else {
          console.warn('Access denied: User not authenticated');
          router.navigate(['/login']);
        }
        return false;
      }
    })
  );
};
